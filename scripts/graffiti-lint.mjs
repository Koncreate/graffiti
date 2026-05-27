/**
 * graffiti-lint
 *
 * Validates that every primary class definition and every `:root` token in
 * `src/lib/drop-in.css` is preceded by a structured annotation comment, and
 * emits `src/lib/registry.json` describing the catalogue.
 *
 * Spec: docs/ANNOTATION-SPEC.md
 *
 * Exports:
 *   - lintCss(source, opts?) -> { violations, registry }   (pure)
 *   - runLint({ check, file }) -> exit code                (CLI side)
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cssTree from "css-tree";

const TOKEN_CATEGORIES = new Set([
  "typography",
  "spacing",
  "radius",
  "color",
  "shadow",
  "motion",
  "border",
  "layout",
  "z-index",
  "misc",
]);

const REQUIRED_TAGS = {
  pattern: ["pattern", "role", "example"],
  "pattern-group": ["pattern-group", "members", "role", "example"],
  token: ["token", "category", "role"],
  "token-group": ["token-group", "matches", "category", "role"],
};

/* ------------------------------------------------------------------ *
 * Comment parsing
 * ------------------------------------------------------------------ */

/**
 * Parse a JSDoc-style comment body into tag entries. The body is the raw
 * value between `/*` and `*​/` (no slashes), with a leading `*` if it was
 * `/**` style.
 *
 * Returns { kind, tags } where kind is one of pattern|pattern-group|
 * token|token-group|null. Tags is a Map<string, string> with multi-line
 * values joined.
 *
 * Tags can be repeated only if explicitly multi-line (currently none —
 * a repeated tag is a violation).
 */
export function parseAnnotation(value) {
  // Strip leading "*" lines and surrounding whitespace
  const lines = value.split("\n").map((line) => {
    return line.replace(/^\s*\*\s?/, "").replace(/\s+$/, "");
  });

  // First non-empty line that starts with @ is the kind tag
  const tags = new Map();
  let currentTag = null;
  let currentBuf = [];
  const duplicates = [];

  const flush = () => {
    if (currentTag === null) return;
    const joined = currentBuf.join("\n").replace(/^\n+|\n+$/g, "");
    if (tags.has(currentTag)) duplicates.push(currentTag);
    else tags.set(currentTag, joined);
    currentTag = null;
    currentBuf = [];
  };

  for (const line of lines) {
    const m = line.match(/^@([a-z-]+)(?:\s+(.*))?$/);
    if (m) {
      flush();
      currentTag = m[1];
      currentBuf = m[2] ? [m[2]] : [];
    } else if (currentTag !== null) {
      currentBuf.push(line);
    }
  }
  flush();

  let kind = null;
  if (tags.has("pattern")) kind = "pattern";
  else if (tags.has("pattern-group")) kind = "pattern-group";
  else if (tags.has("token")) kind = "token";
  else if (tags.has("token-group")) kind = "token-group";

  return { kind, tags, duplicates };
}

/* ------------------------------------------------------------------ *
 * AST classification
 * ------------------------------------------------------------------ */

/**
 * Classify a Rule node's selector. Returns:
 *   { kind: "primary-class", name }    — selector is exactly `.foo`
 *   { kind: "compound" }               — `.foo.bar`, `.foo:hover`, descendants, etc.
 *   { kind: "root" }                   — selector is exactly `:root`
 *   { kind: "other" }                  — anything else
 *
 * For a SelectorList with multiple Selectors, the rule is classified by the
 * MOST permissive entry — any non-primary-class entry kicks it to "other".
 */
function classifyRule(rule) {
  const selectors = rule.prelude?.children?.toArray() ?? [];
  if (selectors.length === 0) return { kind: "other" };

  // Multiple selectors in the list — not a primary class def
  if (selectors.length > 1) {
    // But it could still be `:root, :host { ... }` for tokens — for our purposes
    // we treat that as "other" since we only walk single `:root` for token scope.
    return { kind: "other" };
  }

  const selector = selectors[0];
  const parts = selector.children?.toArray() ?? [];

  if (parts.length === 1) {
    const part = parts[0];
    if (part.type === "ClassSelector") {
      return { kind: "primary-class", name: part.name };
    }
    if (part.type === "PseudoClassSelector" && part.name === "root") {
      return { kind: "root" };
    }
  }

  return { kind: "compound" };
}

/* ------------------------------------------------------------------ *
 * Walker
 * ------------------------------------------------------------------ */

/**
 * Walk the AST and collect "annotation-required" nodes in source order, then
 * dedupe class targets by name (only the first occurrence is canonical).
 *
 * Targets:
 *   { type: "pattern", name, line }   — first primary class def for that name
 *   { type: "token", name, line }     — custom property at :root inside @layer base
 *
 * Skips:
 *   - Compound / descendant / qualified rules
 *   - Nested rules inside other rules (`&.modifier`)
 *   - Subsequent primary defs of an already-seen class name (overrides)
 *   - :root declarations inside @layer themes (or any non-`base` layer)
 *   - Non-custom-property declarations at :root (e.g. `color-scheme`)
 */
function collectTargets(ast) {
  const rawTargets = [];

  const topChildren = ast.children?.toArray() ?? [];
  for (const node of topChildren) {
    if (node.type === "Atrule") {
      if (node.name === "layer") {
        if (!node.block) continue; // statement-form `@layer a, b;`
        const layerName = extractLayerName(node);
        walkContainerBlock(node.block, { layerName }, rawTargets);
      } else if (["media", "container", "supports", "scope"].includes(node.name)) {
        // Unlayered query-wrapped block at the top level (e.g. `@media print`).
        // Walk for primary class defs; first occurrence wins after dedupe.
        if (node.block) walkContainerBlock(node.block, { layerName: null }, rawTargets);
      }
      // Other top-level atrules (@property, @import, @charset, etc.) — skip.
      continue;
    }
    if (node.type === "Rule") {
      // Unlayered top-level rule. Treat as canonical primary def candidate.
      const classification = classifyRule(node);
      if (classification.kind === "primary-class") {
        rawTargets.push({
          type: "pattern",
          name: classification.name,
          line: node.loc?.start.line ?? -1,
          endLine: node.loc?.end.line ?? -1,
          layer: null,
        });
      }
    }
  }

  // Dedupe class targets by name (first occurrence wins).
  // Token targets are NOT deduped — every :root/@layer base declaration is unique
  // by name already because my walker only enters base's :root once per declaration.
  const seenClasses = new Set();
  const deduped = [];
  for (const t of rawTargets) {
    if (t.type === "pattern") {
      if (seenClasses.has(t.name)) continue;
      seenClasses.add(t.name);
    }
    deduped.push(t);
  }
  return deduped;
}

function extractLayerName(layerAtrule) {
  // Structure: Atrule.prelude -> AtrulePrelude -> LayerList -> Layer { name }
  const prelude = layerAtrule.prelude;
  if (!prelude) return null;
  const layerList = prelude.children?.first;
  if (!layerList) return null;
  // Block-form `@layer base { ... }` carries a LayerList with one Layer.
  // Statement-form `@layer base, themes;` carries a LayerList with multiple
  // Layers — we skip that elsewhere because there's no block.
  const firstLayer = layerList.children?.first;
  return firstLayer?.name ?? null;
}

/**
 * Walk a block that may contain Rules and adaptive Atrules (@media, @container,
 * @supports, @scope). Adaptive Atrules recurse — their inner rules are also
 * considered primary-def candidates (first one per name wins via dedupe).
 *
 * `layerName` is the enclosing @layer's name (or null if unlayered). Token
 * collection only happens when layerName === "base".
 */
function walkContainerBlock(block, ctx, targets) {
  const children = block.children?.toArray() ?? [];
  for (const child of children) {
    if (child.type === "Atrule") {
      if (["media", "container", "supports", "scope"].includes(child.name)) {
        if (child.block) walkContainerBlock(child.block, ctx, targets);
      }
      // @property and other atrules — skip
      continue;
    }
    if (child.type !== "Rule") continue;

    const classification = classifyRule(child);
    if (classification.kind === "primary-class") {
      targets.push({
        type: "pattern",
        name: classification.name,
        line: child.loc?.start.line ?? -1,
        endLine: child.loc?.end.line ?? -1,
        layer: ctx.layerName,
      });
      // Do NOT recurse into the rule's block — internal/nested rules are exempt.
    } else if (classification.kind === "root" && ctx.layerName === "base") {
      const rootChildren = child.block?.children?.toArray() ?? [];
      for (const decl of rootChildren) {
        if (decl.type !== "Declaration") continue;
        if (!decl.property.startsWith("--")) continue;
        targets.push({
          type: "token",
          name: decl.property,
          line: decl.loc?.start.line ?? -1,
          endLine: decl.loc?.end.line ?? -1,
          layer: ctx.layerName,
        });
      }
    }
    // compound / other — exempt
  }
}

/* ------------------------------------------------------------------ *
 * Annotation pairing
 * ------------------------------------------------------------------ */

/**
 * Pair annotation comments with the targets they claim, in source order.
 *
 * Claim rules by annotation kind:
 *   - @pattern  : claims exactly the next target (must be type=pattern)
 *   - @token    : claims exactly the next target (must be type=token)
 *   - @pattern-group : claims the next N pattern targets where
 *                       N = the count of names in @members (in order)
 *   - @token-group   : claims subsequent token targets that match @matches,
 *                       stopping at the first non-match
 *
 * After each block claim, control returns to the outer loop: the NEXT target
 * (if any) must have its own annotation, or it becomes an orphan target.
 *
 * Returns: { blocks, orphanTargets, orphanAnnotations }
 */
function pairAnnotationsToTargets(annotationComments, targets) {
  const annotations = annotationComments
    .filter((c) => c.kind !== null)
    .sort((a, b) => a.line - b.line);

  const blocks = [];
  const orphanTargets = [];
  const usedAnnotations = new Set();

  let aIdx = 0;
  let tIdx = 0;

  while (tIdx < targets.length) {
    const target = targets[tIdx];
    // Skip annotations whose line is past the current target's line — they
    // belong to later targets, not this one.
    while (aIdx < annotations.length && annotations[aIdx].line >= target.line) {
      // Annotation comes after target → target has no annotation
      break;
    }

    // Is there an annotation at or before this target line that hasn't been used?
    const nextAnnotation = annotations[aIdx];
    if (!nextAnnotation || nextAnnotation.line > target.line) {
      // Target with no preceding annotation = orphan
      orphanTargets.push(target);
      tIdx++;
      continue;
    }

    // Build a block and claim per kind
    const block = { annotation: nextAnnotation, targets: [] };
    usedAnnotations.add(nextAnnotation);
    aIdx++;

    if (nextAnnotation.kind === "pattern" || nextAnnotation.kind === "token") {
      // Claim exactly this one target — validation will check kind match.
      block.targets.push(target);
      tIdx++;
    } else if (nextAnnotation.kind === "pattern-group") {
      const members = (nextAnnotation.tags.get("members") ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const n = members.length;
      for (let k = 0; k < n && tIdx < targets.length; k++) {
        const t = targets[tIdx];
        if (t.type !== "pattern") break;
        block.targets.push(t);
        tIdx++;
      }
      // If members.length is 0 (invalid), still claim the current target so
      // the validation error attaches to this block, not orphan.
      if (n === 0) {
        block.targets.push(target);
        tIdx++;
      }
    } else if (nextAnnotation.kind === "token-group") {
      const matchesRaw = (nextAnnotation.tags.get("matches") ?? "").trim();
      const regex = matchesRaw ? globToRegex(matchesRaw) : null;
      while (tIdx < targets.length) {
        const t = targets[tIdx];
        if (t.type !== "token") break;
        if (regex && !regex.test(t.name)) break;
        block.targets.push(t);
        tIdx++;
      }
      // If @matches missing/empty, claim just the current target so the
      // required-tags violation attaches to this block.
      if (block.targets.length === 0) {
        block.targets.push(target);
        tIdx++;
      }
    }

    blocks.push(block);
  }

  const orphanAnnotations = annotations.filter((a) => !usedAnnotations.has(a));
  return { blocks, orphanTargets, orphanAnnotations };
}

/* ------------------------------------------------------------------ *
 * Validation rules
 * ------------------------------------------------------------------ */

function validateBlock(block, violations) {
  const { annotation, targets } = block;
  const { kind, tags, duplicates, line: aLine } = annotation;

  for (const d of duplicates) {
    violations.push({
      line: aLine,
      message: `Duplicate @${d} tag in annotation block`,
      rule: "no-duplicate-tags",
    });
  }

  const required = REQUIRED_TAGS[kind];
  for (const t of required) {
    if (!tags.has(t)) {
      violations.push({
        line: aLine,
        message: `Missing required tag @${t} in @${kind} block`,
        rule: "required-tags",
      });
    }
  }

  // Kind-specific checks
  if (kind === "pattern") {
    validatePattern(annotation, targets, violations);
  } else if (kind === "pattern-group") {
    validatePatternGroup(annotation, targets, violations);
  } else if (kind === "token") {
    validateToken(annotation, targets, violations);
  } else if (kind === "token-group") {
    validateTokenGroup(annotation, targets, violations);
  }

  // @example shape (when present)
  if (tags.has("example")) {
    const ex = tags.get("example").trim();
    if (!ex.length) {
      violations.push({
        line: aLine,
        message: `@example is empty`,
        rule: "example-syntax",
      });
    } else if (!/<[a-zA-Z]/.test(ex)) {
      violations.push({
        line: aLine,
        message: `@example must contain at least one HTML element`,
        rule: "example-syntax",
      });
    }
  }

  // @category vocabulary
  if (tags.has("category")) {
    const cat = tags.get("category").trim();
    if (!TOKEN_CATEGORIES.has(cat)) {
      violations.push({
        line: aLine,
        message: `Unknown @category "${cat}"; allowed: ${[...TOKEN_CATEGORIES].join(", ")}`,
        rule: "category-vocabulary",
      });
    }
  }
}

function validatePattern(annotation, targets, violations) {
  const { tags, line: aLine } = annotation;
  const name = tags.get("pattern")?.trim();

  // @pattern annotates exactly ONE target, of type "pattern"
  const patternTargets = targets.filter((t) => t.type === "pattern");
  const tokenTargets = targets.filter((t) => t.type === "token");

  if (tokenTargets.length > 0) {
    violations.push({
      line: aLine,
      message: `@pattern block annotates token(s): ${tokenTargets.map((t) => t.name).join(", ")}`,
      rule: "kind-mismatch",
    });
  }

  if (patternTargets.length === 0) {
    violations.push({
      line: aLine,
      message: `@pattern ${name ?? "?"} has no class definition immediately following it`,
      rule: "orphan-annotation",
    });
    return;
  }

  const first = patternTargets[0];
  if (name !== first.name) {
    violations.push({
      line: aLine,
      message: `@pattern ${name} does not match following selector .${first.name}`,
      rule: "name-agreement",
    });
  }
}

function validatePatternGroup(annotation, targets, violations) {
  const { tags, line: aLine } = annotation;
  const groupName = tags.get("pattern-group")?.trim();
  const membersRaw = tags.get("members") ?? "";
  const members = membersRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const patternTargets = targets.filter((t) => t.type === "pattern");
  const tokenTargets = targets.filter((t) => t.type === "token");

  if (tokenTargets.length > 0) {
    violations.push({
      line: aLine,
      message: `@pattern-group ${groupName} annotates token(s): ${tokenTargets.map((t) => t.name).join(", ")}`,
      rule: "kind-mismatch",
    });
  }

  if (patternTargets.length === 0) {
    violations.push({
      line: aLine,
      message: `@pattern-group ${groupName} has no class definitions following it`,
      rule: "orphan-annotation",
    });
    return;
  }

  const actualNames = patternTargets.map((t) => t.name);
  // Exact equality, in order
  if (actualNames.length !== members.length) {
    violations.push({
      line: aLine,
      message: `@pattern-group ${groupName} @members count (${members.length}) does not match following class defs (${actualNames.length}: ${actualNames.map((n) => "." + n).join(", ")})`,
      rule: "members-exact",
    });
    return;
  }
  for (let i = 0; i < members.length; i++) {
    if (members[i] !== actualNames[i]) {
      violations.push({
        line: aLine,
        message: `@pattern-group ${groupName} @members[${i}] = "${members[i]}" but actual class at line ${patternTargets[i].line} is .${actualNames[i]}`,
        rule: "members-exact",
      });
    }
  }
}

function validateToken(annotation, targets, violations) {
  const { tags, line: aLine } = annotation;
  const name = tags.get("token")?.trim();

  const tokenTargets = targets.filter((t) => t.type === "token");
  const patternTargets = targets.filter((t) => t.type === "pattern");

  if (patternTargets.length > 0) {
    violations.push({
      line: aLine,
      message: `@token block annotates class(es): ${patternTargets.map((t) => "." + t.name).join(", ")}`,
      rule: "kind-mismatch",
    });
  }

  if (tokenTargets.length === 0) {
    violations.push({
      line: aLine,
      message: `@token ${name ?? "?"} has no custom property declaration immediately following it`,
      rule: "orphan-annotation",
    });
    return;
  }

  const first = tokenTargets[0];
  if (name !== first.name) {
    violations.push({
      line: aLine,
      message: `@token ${name} does not match following declaration ${first.name}`,
      rule: "name-agreement",
    });
  }
}

function validateTokenGroup(annotation, targets, violations) {
  const { tags, line: aLine } = annotation;
  const groupName = tags.get("token-group")?.trim();
  const matches = tags.get("matches")?.trim();

  const tokenTargets = targets.filter((t) => t.type === "token");
  const patternTargets = targets.filter((t) => t.type === "pattern");

  if (patternTargets.length > 0) {
    violations.push({
      line: aLine,
      message: `@token-group ${groupName} annotates class(es): ${patternTargets.map((t) => "." + t.name).join(", ")}`,
      rule: "kind-mismatch",
    });
  }

  if (tokenTargets.length === 0) {
    violations.push({
      line: aLine,
      message: `@token-group ${groupName} has no token declarations following it`,
      rule: "orphan-annotation",
    });
    return;
  }

  if (!matches) {
    // already flagged by required-tags
    return;
  }

  const regex = globToRegex(matches);
  for (const t of tokenTargets) {
    if (!regex.test(t.name)) {
      violations.push({
        line: aLine,
        message: `@token-group ${groupName} @matches "${matches}" does not cover ${t.name} (line ${t.line})`,
        rule: "matches-exhaustive",
      });
    }
  }
}

/**
 * Convert a glob (or comma-separated list of globs) like
 *   `--vs-*`
 *   `--yellow, --amber, --orange`
 *   `--yellow-*, --amber-*`
 * to a RegExp that matches any of the listed patterns. `*` is the only
 * wildcard; everything else is literal.
 */
function globToRegex(glob) {
  const parts = glob
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length === 0) return /^$/;
  const escapedParts = parts.map((p) =>
    p.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*"),
  );
  return new RegExp("^(?:" + escapedParts.join("|") + ")$");
}

/* ------------------------------------------------------------------ *
 * Cross-block validation (related resolution, duplicates)
 * ------------------------------------------------------------------ */

function validateCrossBlock(blocks, allAnnotations, violations) {
  // Scan ALL annotations (paired + orphan) for duplicate names within the same kind.
  const seen = new Map(); // key "kind:name" -> first line
  for (const a of allAnnotations) {
    if (!a.kind) continue;
    const name = a.tags.get(a.kind)?.trim();
    if (!name) continue;
    const key = `${a.kind}:${name}`;
    if (seen.has(key)) {
      violations.push({
        line: a.line,
        message: `Duplicate @${a.kind} ${name} (already declared at line ${seen.get(key)})`,
        rule: "no-duplicates",
      });
    } else {
      seen.set(key, a.line);
    }
  }

  // @related resolution
  const registeredPatternNames = new Set(
    blocks
      .filter((b) => b.annotation.kind === "pattern")
      .map((b) => b.annotation.tags.get("pattern")?.trim())
      .filter(Boolean),
  );
  const registeredGroupNames = new Set(
    blocks
      .filter((b) => b.annotation.kind === "pattern-group")
      .map((b) => b.annotation.tags.get("pattern-group")?.trim())
      .filter(Boolean),
  );
  const allPatternish = new Set([
    ...registeredPatternNames,
    ...registeredGroupNames,
  ]);

  for (const b of blocks) {
    if (b.annotation.kind !== "pattern" && b.annotation.kind !== "pattern-group") {
      continue;
    }
    const relatedRaw = b.annotation.tags.get("related");
    if (!relatedRaw) continue;
    const related = relatedRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const r of related) {
      if (!allPatternish.has(r)) {
        violations.push({
          line: b.annotation.line,
          message: `@related "${r}" does not resolve to any registered pattern or pattern-group`,
          rule: "related-resolves",
        });
      }
    }
  }
}

/* ------------------------------------------------------------------ *
 * Registry assembly
 * ------------------------------------------------------------------ */

function buildRegistry(blocks, sourcePath) {
  const registry = {
    sourceFile: sourcePath,
    patterns: [],
    patternGroups: [],
    tokens: [],
    tokenGroups: [],
  };

  const baseEntry = (annotation, targets) => {
    const tags = annotation.tags;
    return {
      role: tags.get("role")?.trim() ?? "",
      since: tags.get("since")?.trim() ?? null,
      deprecated: tags.get("deprecated")?.trim() ?? null,
      source: {
        file: sourcePath,
        annotationLine: annotation.line,
      },
    };
  };

  for (const b of blocks) {
    const { kind, tags } = b.annotation;
    const base = baseEntry(b.annotation, b.targets);

    if (kind === "pattern") {
      const target = b.targets.find((t) => t.type === "pattern");
      const modifiers = tags.get("modifiers")
        ? tags.get("modifiers").split(",").map((s) => s.trim()).filter(Boolean)
        : [];
      const related = tags.get("related")
        ? tags.get("related").split(",").map((s) => s.trim()).filter(Boolean)
        : [];
      registry.patterns.push({
        name: tags.get("pattern")?.trim(),
        ...base,
        example: tags.get("example")?.trim() ?? "",
        modifiers,
        preferOver: tags.get("prefer-over")?.trim() ?? null,
        related,
        source: { ...base.source, declarationLine: target?.line ?? null },
      });
    } else if (kind === "pattern-group") {
      const members = (tags.get("members") ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const related = tags.get("related")
        ? tags.get("related").split(",").map((s) => s.trim()).filter(Boolean)
        : [];
      registry.patternGroups.push({
        name: tags.get("pattern-group")?.trim(),
        ...base,
        members,
        example: tags.get("example")?.trim() ?? "",
        preferOver: tags.get("prefer-over")?.trim() ?? null,
        related,
      });
    } else if (kind === "token") {
      const target = b.targets.find((t) => t.type === "token");
      registry.tokens.push({
        name: tags.get("token")?.trim(),
        ...base,
        category: tags.get("category")?.trim() ?? "",
        source: { ...base.source, declarationLine: target?.line ?? null },
      });
    } else if (kind === "token-group") {
      const members = b.targets.filter((t) => t.type === "token").map((t) => t.name);
      registry.tokenGroups.push({
        name: tags.get("token-group")?.trim(),
        ...base,
        category: tags.get("category")?.trim() ?? "",
        matches: tags.get("matches")?.trim() ?? "",
        scale: tags.get("scale")?.trim() ?? null,
        members,
      });
    }
  }

  return registry;
}

/* ------------------------------------------------------------------ *
 * Top-level lint
 * ------------------------------------------------------------------ */

/**
 * Pure function. Takes CSS source + optional path label, returns
 * { violations, registry, summary }.
 */
export function lintCss(source, { sourcePath = "src/lib/drop-in.css" } = {}) {
  const annotationComments = [];

  const ast = cssTree.parse(source, {
    positions: true,
    onComment: (value, loc) => {
      // Only `/** ... */` (starts with `*`) are candidate annotations.
      // Regular `/* ... */` (value starts with space or other) are ignored.
      const isJsdoc = value.startsWith("*");
      if (!isJsdoc) return;
      const parsed = parseAnnotation(value);
      annotationComments.push({
        ...parsed,
        line: loc.start.line,
        endLine: loc.end.line,
        raw: value,
      });
    },
  });

  const targets = collectTargets(ast);
  const { blocks, orphanTargets, orphanAnnotations } = pairAnnotationsToTargets(
    annotationComments,
    targets,
  );

  const violations = [];

  // Coverage violations
  for (const t of orphanTargets) {
    violations.push({
      line: t.line,
      message:
        t.type === "pattern"
          ? `Missing annotation: class .${t.name} has no preceding @pattern or @pattern-group block`
          : `Missing annotation: token ${t.name} has no preceding @token or @token-group block`,
      rule: "coverage",
    });
  }

  for (const a of orphanAnnotations) {
    violations.push({
      line: a.line,
      message: `@${a.kind} block has no target (no class or token follows it within scope)`,
      rule: "orphan-annotation",
    });
  }

  // Per-block validation
  for (const b of blocks) {
    validateBlock(b, violations);
  }

  // Cross-block validation (sees orphan annotations too)
  validateCrossBlock(blocks, annotationComments, violations);

  // Sort violations by line for stable output
  violations.sort((a, b) => a.line - b.line || a.rule.localeCompare(b.rule));

  const registry = buildRegistry(blocks, sourcePath);

  return {
    violations,
    registry,
    summary: {
      targets: targets.length,
      blocks: blocks.length,
      patterns: registry.patterns.length,
      patternGroups: registry.patternGroups.length,
      tokens: registry.tokens.length,
      tokenGroups: registry.tokenGroups.length,
    },
  };
}

/* ------------------------------------------------------------------ *
 * CLI
 * ------------------------------------------------------------------ */

const filePath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(filePath);
const repoRoot = path.resolve(scriptDir, "..");

const DEFAULTS = {
  input: path.join(repoRoot, "src/lib/drop-in.css"),
  registry: path.join(repoRoot, "src/lib/registry.json"),
};

export async function runLint({
  input = DEFAULTS.input,
  registryOut = DEFAULTS.registry,
  check = false,
} = {}) {
  const source = await readFile(input, "utf8");
  const sourcePath = path.relative(repoRoot, input);
  const result = lintCss(source, { sourcePath });

  if (result.violations.length === 0) {
    if (!check) {
      await writeFile(
        registryOut,
        JSON.stringify(result.registry, null, 2) + "\n",
      );
      console.log(
        `graffiti-lint: clean. ${result.summary.patterns} patterns, ${result.summary.patternGroups} groups, ${result.summary.tokens} tokens, ${result.summary.tokenGroups} token groups → ${path.relative(repoRoot, registryOut)}`,
      );
    } else {
      console.log(
        `graffiti-lint: clean. ${result.summary.targets} targets covered by ${result.summary.blocks} annotation blocks.`,
      );
    }
    return 0;
  }

  console.error(`graffiti-lint: ${result.violations.length} violation(s) in ${sourcePath}\n`);
  for (const v of result.violations) {
    console.error(`  ${sourcePath}:${v.line}  [${v.rule}]  ${v.message}`);
  }
  console.error(
    `\n${result.summary.targets} targets, ${result.summary.blocks} annotation blocks. See docs/ANNOTATION-SPEC.md.`,
  );
  return 1;
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === filePath;
if (isCli) {
  const args = process.argv.slice(2);
  const check = args.includes("--check");
  const exitCode = await runLint({ check });
  process.exit(exitCode);
}
