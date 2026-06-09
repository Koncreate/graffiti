/**
 * Registry search engine for the docs command palette.
 *
 * Joins the CSS-derived registry (src/lib/registry.json — patterns, tokens, and
 * their groups, generated from the `@pattern`/`@token` annotations) with the
 * docs content graph (topic frontmatter) into one flat, navigable index, then
 * ranks it with fzf-style fuzzy matching.
 *
 * Pure + framework-agnostic: no Svelte, no DOM, no Node APIs. The palette
 * component feeds it data and renders the results; this file only computes.
 */

const SECTION_LABELS = {
  base: "Base",
  utilities: "Utilities",
  elements: "Elements",
  "ui-blocks": "UI Blocks",
};

const KIND_LABELS = {
  pattern: "Class",
  "pattern-group": "Class group",
  token: "Token",
  "token-group": "Token group",
  topic: "Guide",
};

// Token category → the base topic that documents it, used as a navigation
// fallback when an entry has no class-level join to a topic.
const TOKEN_CATEGORY_TOPIC = {
  typography: "typography",
  color: "colors",
  spacing: "variables",
  layout: "variables",
  radius: "variables",
  border: "variables",
  shadow: "variables",
  motion: "variables",
  "z-index": "variables",
};

/* ------------------------------------------------------------------ *
 * Fuzzy matching (fzf-style subsequence scoring)
 * ------------------------------------------------------------------ */

/**
 * Score how well `query` fuzzy-matches `target`. Returns 0 when `query` is not
 * a subsequence of `target`; otherwise a positive score where exact and prefix
 * matches dominate, and consecutive / word-boundary matches outrank scattered
 * ones.
 *
 * @param {string} query  expected pre-lowercased
 * @param {string} target raw text (lowercased internally)
 * @returns {number}
 */
export function fuzzyScore(query, target) {
  if (!query || !target) return 0;
  const hay = target.toLowerCase();
  if (hay === query) return 1000;
  if (hay.startsWith(query)) return 600 + (query.length / hay.length) * 100;

  let score = 0;
  let qi = 0;
  let prevMatch = -2;
  let firstMatch = -1;

  for (let hi = 0; hi < hay.length && qi < query.length; hi++) {
    if (hay[hi] !== query[qi]) continue;
    if (firstMatch === -1) firstMatch = hi;

    let charScore = 10;
    if (hi === prevMatch + 1) charScore += 15; // consecutive run
    const prev = hi > 0 ? hay[hi - 1] : "";
    if (hi === 0 || prev === "-" || prev === "_" || prev === " " || prev === ".") {
      charScore += 12; // start of a word
    }

    score += charScore;
    prevMatch = hi;
    qi++;
  }

  if (qi < query.length) return 0; // not every query char was consumed
  score -= firstMatch * 1.5; // earlier first hit is better
  score += (query.length / hay.length) * 40; // denser coverage is better
  return Math.max(score, 1);
}

/* ------------------------------------------------------------------ *
 * Topic lookup (class/token name → documenting topic)
 * ------------------------------------------------------------------ */

/**
 * Extract lookup keys from a single topic `classes` entry. Returns exact keys
 * (`.icon-button` → `icon-button`, `--font-sans`) and wildcard prefixes
 * (`.fs-*` → `fs-`, `--vs-*` → `--vs-`).
 *
 * @param {string} classStr
 */
function classKeysFrom(classStr) {
  const exact = new Set();
  const prefixes = new Set();
  const s = classStr.trim();

  // Custom properties: --foo or --foo-*
  for (const m of s.matchAll(/--[a-z0-9-]+/gi)) {
    const end = m.index + m[0].length;
    if (s[end] === "*") prefixes.add(m[0].toLowerCase());
    else exact.add(m[0].toLowerCase());
  }

  // Dotted class selectors: .foo or .foo-*
  for (const m of s.matchAll(/\.[a-z][a-z0-9-]*/gi)) {
    const end = m.index + m[0].length;
    const key = m[0].slice(1).toLowerCase();
    if (s[end] === "*") prefixes.add(key);
    else exact.add(key);
  }

  // Leading bare element selector: "button[aria-label]" → button, "details"
  if (!s.startsWith("--") && !s.startsWith(".")) {
    const bare = s.match(/^[a-z][a-z0-9-]*/i);
    if (bare) exact.add(bare[0].toLowerCase());
  }

  return { exact: [...exact], prefixes: [...prefixes] };
}

/**
 * @param {import("../content/topics.js").parseTopicMarkdown extends (...a:any)=>infer R ? R : any} topics
 */
function buildTopicLookup(topics) {
  const exact = new Map();
  const prefixes = [];
  const byId = new Map();

  for (const topic of topics) {
    byId.set(topic.id, topic);
    for (const cls of topic.classes ?? []) {
      const keys = classKeysFrom(cls);
      for (const k of keys.exact) if (!exact.has(k)) exact.set(k, topic);
      for (const p of keys.prefixes) prefixes.push({ prefix: p, topic });
    }
  }

  // Longest prefix first so the most specific wildcard wins.
  prefixes.sort((a, b) => b.prefix.length - a.prefix.length);
  return { exact, prefixes, byId };
}

/** @param {string} raw */
function normalizeKey(raw) {
  return (raw.startsWith(".") ? raw.slice(1) : raw).toLowerCase();
}

/**
 * Resolve the first candidate name that maps to a documenting topic.
 * @param {{ exact: Map<string, any>, prefixes: Array<{prefix:string, topic:any}> }} lookup
 * @param {Array<string|undefined>} candidates
 */
function resolveTopic(lookup, candidates) {
  for (const raw of candidates) {
    if (!raw) continue;
    const key = normalizeKey(raw);
    const direct = lookup.exact.get(key);
    if (direct) return direct;
    for (const { prefix, topic } of lookup.prefixes) {
      if (key.startsWith(prefix)) return topic;
    }
  }
  return null;
}

/* ------------------------------------------------------------------ *
 * Index building
 * ------------------------------------------------------------------ */

/** @param {string} name */
function humanize(name) {
  return name
    .replace(/^--/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** @param {string|null|undefined} matches */
function parseMatches(matches) {
  if (!matches) return [];
  return matches.split(",").map((m) => m.trim()).filter(Boolean);
}

/**
 * A concise, recognizable label for a token group. Short wildcard/pair
 * `matches` (`--vs-*`, `--min-vw, --max-vw`) read well as-is; long explicit
 * lists are noise, so fall back to the humanized group name.
 * @param {{ name:string, matches?:string|null }} group
 */
function tokenGroupDisplay(group) {
  if (group.matches && group.matches.length <= 28) return group.matches;
  return humanize(group.name);
}

function topicHref(topic) {
  return `/${topic.route}/${topic.id}`;
}

function sectionFor(topic, kind) {
  if (topic) return SECTION_LABELS[topic.route] ?? topic.route;
  return KIND_LABELS[kind] ?? "";
}

function sourceLine(entry) {
  if (!entry.source) return null;
  const line = entry.source.declarationLine ?? entry.source.annotationLine;
  return line ? `${entry.source.file}:${line}` : null;
}

/**
 * Build the flat, searchable index from the registry + content graph.
 *
 * @param {{ patterns: any[], patternGroups: any[], tokens: any[], tokenGroups: any[] }} registry
 * @param {Array<{ id:string, title:string, route:string, summary:string, whenToUse:string, classes:string[], tags:string[] }>} topics
 */
export function buildSearchIndex(registry, topics) {
  const lookup = buildTopicLookup(topics);
  const records = [];
  const coveredTopicIds = new Set();

  /**
   * @param {any} entry
   * @param {"pattern"|"pattern-group"|"token"|"token-group"} kind
   * @param {string} display
   * @param {string[]} candidates extra names (members/matches) to resolve a topic with
   */
  const addEntry = (entry, kind, display, candidates) => {
    const topic =
      resolveTopic(lookup, [entry.name, ...candidates]) ??
      (TOKEN_CATEGORY_TOPIC[entry.category]
        ? lookup.byId.get(TOKEN_CATEGORY_TOPIC[entry.category])
        : null);

    // Only a same-named pattern counts as "covering" a topic — that's the case
    // that would otherwise produce a duplicate Guide row for the same thing.
    if (topic && topic.id === entry.name) coveredTopicIds.add(topic.id);

    records.push({
      key: `${kind}:${entry.name}`,
      kind,
      name: entry.name,
      display,
      title: topic ? topic.title : humanize(entry.name),
      section: sectionFor(topic, kind),
      href: topic ? topicHref(topic) : null,
      role: entry.role ?? "",
      whenToUse: topic?.whenToUse ?? "",
      summary: topic?.summary ?? "",
      example: entry.example ?? "",
      modifiers: entry.modifiers ?? [],
      related: entry.related ?? [],
      members: entry.members ?? [],
      tags: topic?.tags ?? [],
      deprecated: entry.deprecated ?? null,
      copy: display,
      sourceLine: sourceLine(entry),
    });
  };

  for (const p of registry.patterns ?? []) {
    addEntry(p, "pattern", `.${p.name}`, []);
  }
  for (const g of registry.patternGroups ?? []) {
    addEntry(g, "pattern-group", `.${g.name}`, g.members ?? []);
  }
  for (const t of registry.tokens ?? []) {
    addEntry(t, "token", t.name, []);
  }
  for (const g of registry.tokenGroups ?? []) {
    addEntry(g, "token-group", tokenGroupDisplay(g), [
      ...(g.members ?? []),
      ...parseMatches(g.matches),
    ]);
  }

  // Topic guides that aren't already represented by a same-named class — base
  // concept pages (typography, colors, variables…) and composed UI-block
  // patterns (user-menu, mobile, login-form…). Keeps every doc page findable.
  for (const topic of topics) {
    if (coveredTopicIds.has(topic.id)) continue;
    records.push({
      key: `topic:${topic.id}`,
      kind: "topic",
      name: topic.id,
      display: topic.title,
      title: topic.title,
      section: sectionFor(topic, "topic"),
      href: topicHref(topic),
      role: topic.summary ?? "",
      whenToUse: topic.whenToUse ?? "",
      summary: topic.summary ?? "",
      example: "",
      modifiers: [],
      related: [],
      members: [],
      tags: topic.tags ?? [],
      deprecated: null,
      copy: topic.classes?.[0] ?? null,
      sourceLine: null,
    });
  }

  return records;
}

/* ------------------------------------------------------------------ *
 * Searching
 * ------------------------------------------------------------------ */

// Single-value fields and their weights.
const TEXT_FIELDS = [
  ["display", 1.0],
  ["name", 0.97],
  ["title", 0.9],
  ["whenToUse", 0.45],
  ["role", 0.4],
  ["summary", 0.4],
  ["example", 0.15],
];

// Array fields and their weights (best member wins).
const LIST_FIELDS = [
  ["modifiers", 0.6],
  ["members", 0.6],
  ["related", 0.55],
  ["tags", 0.5],
];

/**
 * Rank `index` against `query`. Strips a leading `.` or `#` so `.card` and
 * `card` behave the same. Returns `{ record, score, matchedField }` sorted by
 * relevance, capped at `limit`.
 *
 * @param {ReturnType<typeof buildSearchIndex>} index
 * @param {string} rawQuery
 * @param {{ limit?: number }} [opts]
 */
export function searchIndex(index, rawQuery, opts = {}) {
  const { limit = 25 } = opts;
  const query = rawQuery.trim().toLowerCase().replace(/^[.#]/, "");
  if (!query) return [];

  const results = [];
  for (const record of index) {
    let best = 0;
    let matchedField = null;

    for (const [field, weight] of TEXT_FIELDS) {
      const value = record[field];
      if (!value) continue;
      const s = fuzzyScore(query, value) * weight;
      if (s > best) {
        best = s;
        matchedField = field;
      }
    }

    for (const [field, weight] of LIST_FIELDS) {
      for (const item of record[field] ?? []) {
        const s = fuzzyScore(query, String(item)) * weight;
        if (s > best) {
          best = s;
          matchedField = field;
        }
      }
    }

    if (best > 0) results.push({ record, score: best, matchedField });
  }

  results.sort(
    (a, b) => b.score - a.score || a.record.display.localeCompare(b.record.display),
  );
  return results.slice(0, limit);
}
