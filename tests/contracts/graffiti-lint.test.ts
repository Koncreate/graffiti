import { describe, expect, it } from "vitest";
// @ts-expect-error — ESM .mjs without types
import { lintCss, parseAnnotation } from "../../scripts/graffiti-lint.mjs";

interface Violation {
  line: number;
  rule: string;
  message: string;
}
interface LintResult {
  violations: Violation[];
  registry: {
    patterns: { name: string; modifiers: string[] }[];
    patternGroups: { name: string; members: string[] }[];
    tokens: { name: string; category: string }[];
    tokenGroups: { name: string; matches: string; members: string[] }[];
  };
  summary: {
    targets: number;
    blocks: number;
    patterns: number;
    patternGroups: number;
    tokens: number;
    tokenGroups: number;
  };
}

const lint = (css: string) => lintCss(css, { sourcePath: "test.css" }) as LintResult;
const rules = (r: LintResult) => r.violations.map((v) => v.rule);

const valid = {
  pattern: (name = "card") => `
@layer components {
  /**
   * @pattern ${name}
   * @role A card surface
   * @example <article class="${name}">...</article>
   */
  .${name} { padding: 1rem; }
}`,
  patternGroup: (names = ["aspect-square", "aspect-video"]) => `
@layer utilities {
  /**
   * @pattern-group aspect-ratios
   * @members ${names.join(", ")}
   * @role Aspect ratio constraints
   * @example <div class="aspect-video"><img></div>
   */
${names.map((n) => `  .${n} { aspect-ratio: 1; }`).join("\n")}
}`,
  token: (name = "--font-sans") => `
@layer base {
  :root {
    /**
     * @token ${name}
     * @category typography
     * @role Default sans-serif font stack
     */
    ${name}: sans-serif;
  }
}`,
  tokenGroup: () => `
@layer base {
  :root {
    /**
     * @token-group vertical-spacing
     * @matches --vs-*
     * @category spacing
     * @role Vertical rhythm scale
     */
    --vs-xs: 0.25rem;
    --vs-s: 0.5rem;
    --vs-m: 1rem;
  }
}`,
};

describe("parseAnnotation", () => {
  it("extracts kind + tags from a /** @pattern */ comment body", () => {
    const body = `*\n * @pattern card\n * @role A card\n * @example <div class="card">x</div>\n `;
    const result = parseAnnotation(body);
    expect(result.kind).toBe("pattern");
    expect(result.tags.get("pattern")).toBe("card");
    expect(result.tags.get("role")).toBe("A card");
    expect(result.tags.get("example")).toContain('<div class="card">');
  });

  it("preserves multi-line tag values", () => {
    const body = `*\n * @pattern stat-card\n * @role A surface\n * @example\n *   <article class="stat-card">\n *     <p>x</p>\n *   </article>\n `;
    const result = parseAnnotation(body);
    expect(result.tags.get("example")).toContain('<article class="stat-card">');
    expect(result.tags.get("example")).toContain("<p>x</p>");
  });

  it("returns kind=null for an empty body", () => {
    const result = parseAnnotation("*\n * \n ");
    expect(result.kind).toBeNull();
  });

  it("flags duplicate tags", () => {
    const body = `*\n * @pattern card\n * @role A\n * @role B\n `;
    const result = parseAnnotation(body);
    expect(result.duplicates).toContain("role");
  });
});

describe("lintCss — happy paths (clean fixtures)", () => {
  it("passes a single annotated @pattern", () => {
    const r = lint(valid.pattern());
    expect(r.violations).toEqual([]);
    expect(r.summary.patterns).toBe(1);
  });

  it("passes a @pattern-group covering multiple class defs", () => {
    const r = lint(valid.patternGroup());
    expect(r.violations).toEqual([]);
    expect(r.summary.patternGroups).toBe(1);
    expect(r.registry.patternGroups[0].members).toEqual([
      "aspect-square",
      "aspect-video",
    ]);
  });

  it("passes a single @token at :root inside @layer base", () => {
    const r = lint(valid.token());
    expect(r.violations).toEqual([]);
    expect(r.summary.tokens).toBe(1);
  });

  it("passes a @token-group whose @matches glob covers all declarations", () => {
    const r = lint(valid.tokenGroup());
    expect(r.violations).toEqual([]);
    expect(r.summary.tokenGroups).toBe(1);
    expect(r.registry.tokenGroups[0].members).toEqual([
      "--vs-xs",
      "--vs-s",
      "--vs-m",
    ]);
  });
});

describe("lintCss — exempt constructs (must NOT trigger violations)", () => {
  it("ignores compound modifiers (.card.featured) — covered by parent @modifiers", () => {
    const css = `
@layer components {
  /**
   * @pattern card
   * @role A card
   * @example <article class="card"></article>
   * @modifiers featured, linked
   */
  .card { padding: 1rem; }
  .card.featured { color: red; }
  .card.linked { cursor: pointer; }
}`;
    const r = lint(css);
    expect(r.violations).toEqual([]);
  });

  it("ignores descendant rules (.card > *)", () => {
    const css = `
@layer components {
  /**
   * @pattern card
   * @role A card
   * @example <article class="card"></article>
   */
  .card { padding: 1rem; }
  .card > * { margin: 0; }
  .card > :is(header, footer) { padding: 0.5rem; }
}`;
    expect(lint(css).violations).toEqual([]);
  });

  it("ignores qualified context rules (:is(form) .row)", () => {
    const css = `
@layer utilities {
  /**
   * @pattern row
   * @role Form field row
   * @example <div class="row"><label>x</label></div>
   */
  .row { margin: 1rem; }
  :is(form, fieldset) .row { display: grid; }
}`;
    expect(lint(css).violations).toEqual([]);
  });

  it("ignores nested &.modifier rules (CSS nesting)", () => {
    const css = `
@layer components {
  /**
   * @pattern split
   * @role Split layout
   * @example <div class="split"></div>
   * @modifiers even, vertical
   */
  .split {
    display: flex;
    &.even { flex: 1; }
    &.vertical { flex-direction: column; }
  }
}`;
    expect(lint(css).violations).toEqual([]);
  });

  it("ignores rules inside @media / @container nested in a @layer", () => {
    const css = `
@layer utilities {
  /**
   * @pattern split
   * @role Split layout
   * @example <div class="split"></div>
   */
  .split { display: flex; }

  @container (max-width: 500px) {
    .split { flex-direction: column; }
  }
}`;
    expect(lint(css).violations).toEqual([]);
  });

  it("ignores :root token declarations in @layer themes", () => {
    const css = `
@layer base {
  :root {
    /**
     * @token --bg
     * @category color
     * @role Background
     */
    --bg: white;
  }
}
@layer themes {
  :root {
    --bg: black;
  }
}`;
    expect(lint(css).violations).toEqual([]);
  });
});

describe("lintCss — coverage rule", () => {
  it("flags an unannotated class def", () => {
    const css = `@layer components { .card { padding: 1rem; } }`;
    expect(rules(lint(css))).toContain("coverage");
  });

  it("flags an unannotated :root token in @layer base", () => {
    const css = `@layer base { :root { --bg: white; } }`;
    expect(rules(lint(css))).toContain("coverage");
  });
});

describe("lintCss — required-tags rule", () => {
  it("flags @pattern missing @role", () => {
    const css = `
@layer components {
  /**
   * @pattern card
   * @example <article class="card"></article>
   */
  .card { padding: 1rem; }
}`;
    expect(rules(lint(css))).toContain("required-tags");
  });

  it("flags @pattern missing @example", () => {
    const css = `
@layer components {
  /**
   * @pattern card
   * @role A card
   */
  .card { padding: 1rem; }
}`;
    expect(rules(lint(css))).toContain("required-tags");
  });

  it("flags @token-group missing @matches", () => {
    const css = `
@layer base {
  :root {
    /**
     * @token-group vs
     * @category spacing
     * @role Vertical spacing
     */
    --vs-xs: 0.25rem;
  }
}`;
    expect(rules(lint(css))).toContain("required-tags");
  });
});

describe("lintCss — name-agreement rule", () => {
  it("flags @pattern whose name does not match the following selector", () => {
    const css = `
@layer components {
  /**
   * @pattern stat-card
   * @role A card
   * @example <article class="stat-card"></article>
   */
  .card { padding: 1rem; }
}`;
    expect(rules(lint(css))).toContain("name-agreement");
  });

  it("flags @token whose name does not match the following declaration", () => {
    const css = `
@layer base {
  :root {
    /**
     * @token --bg
     * @category color
     * @role Background
     */
    --fg: white;
  }
}`;
    expect(rules(lint(css))).toContain("name-agreement");
  });
});

describe("lintCss — members-exact rule (@pattern-group)", () => {
  it("flags @members list with names in the wrong order", () => {
    const css = `
@layer utilities {
  /**
   * @pattern-group aspects
   * @members aspect-video, aspect-square
   * @role Aspects
   * @example <div class="aspect-video"></div>
   */
  .aspect-square { aspect-ratio: 1; }
  .aspect-video { aspect-ratio: 16/9; }
}`;
    expect(rules(lint(css))).toContain("members-exact");
  });

  it("flags @members name that does not match actual class", () => {
    const css = `
@layer utilities {
  /**
   * @pattern-group aspects
   * @members aspect-square, aspect-circle
   * @role Aspects
   * @example <div class="aspect-square"></div>
   */
  .aspect-square { aspect-ratio: 1; }
  .aspect-video { aspect-ratio: 16/9; }
}`;
    expect(rules(lint(css))).toContain("members-exact");
  });

  it("flags a class def left orphan when @members list is shorter than the family", () => {
    // Strict pairing: @members claims exactly N targets; extras become orphans.
    const css = `
@layer utilities {
  /**
   * @pattern-group aspects
   * @members aspect-square
   * @role Aspects
   * @example <div class="aspect-square"></div>
   */
  .aspect-square { aspect-ratio: 1; }
  .aspect-video { aspect-ratio: 16/9; }
}`;
    // .aspect-video has no preceding annotation now
    expect(rules(lint(css))).toContain("coverage");
  });
});

describe("lintCss — @matches supports comma-separated globs", () => {
  it("matches any of a list of exact names", () => {
    const css = `
@layer base {
  :root {
    /**
     * @token-group base-colors
     * @matches --yellow, --amber, --orange
     * @category color
     * @role Base hue tokens used to derive scales
     */
    --yellow: oklch(0.88 0.15 95);
    --amber: oklch(0.78 0.16 80);
    --orange: oklch(0.75 0.18 65);
  }
}`;
    const r = lint(css);
    expect(r.violations).toEqual([]);
    expect(r.registry.tokenGroups[0].members).toEqual([
      "--yellow",
      "--amber",
      "--orange",
    ]);
  });

  it("stops claiming at the first token outside ALL listed globs", () => {
    const css = `
@layer base {
  :root {
    /**
     * @token-group base-colors
     * @matches --yellow, --amber
     * @category color
     * @role Base hue tokens
     */
    --yellow: oklch(0.88 0.15 95);
    --amber: oklch(0.78 0.16 80);
    --orange: oklch(0.75 0.18 65);
  }
}`;
    // --orange should be orphaned since it matches neither
    expect(rules(lint(css))).toContain("coverage");
  });
});

describe("lintCss — matches-exhaustive rule (@token-group)", () => {
  it("flags the first token when it does not match the @matches glob (group claims nothing)", () => {
    const css = `
@layer base {
  :root {
    /**
     * @token-group vs
     * @matches --xs-*
     * @category spacing
     * @role Vertical spacing
     */
    --vs-xs: 0.25rem;
  }
}`;
    expect(rules(lint(css))).toContain("matches-exhaustive");
  });

  it("leaves out-of-glob tokens orphaned (coverage), not absorbed into the group", () => {
    // Strict pairing stops at the first non-matching token. The non-matching
    // tokens then need their own annotation, so they show up as coverage.
    const css = `
@layer base {
  :root {
    /**
     * @token-group vs
     * @matches --vs-*
     * @category spacing
     * @role Vertical spacing
     */
    --vs-xs: 0.25rem;
    --pad-s: 0.5rem;
  }
}`;
    expect(rules(lint(css))).toContain("coverage");
  });
});

describe("lintCss — example-syntax rule", () => {
  it("flags an empty @example", () => {
    const css = `
@layer components {
  /**
   * @pattern card
   * @role A card
   * @example
   */
  .card { padding: 1rem; }
}`;
    expect(rules(lint(css))).toContain("example-syntax");
  });

  it("flags an @example with no HTML element", () => {
    const css = `
@layer components {
  /**
   * @pattern card
   * @role A card
   * @example just some text
   */
  .card { padding: 1rem; }
}`;
    expect(rules(lint(css))).toContain("example-syntax");
  });
});

describe("lintCss — category-vocabulary rule", () => {
  it("flags an unknown @category", () => {
    const css = `
@layer base {
  :root {
    /**
     * @token --bg
     * @category vibes
     * @role Background
     */
    --bg: white;
  }
}`;
    expect(rules(lint(css))).toContain("category-vocabulary");
  });
});

describe("lintCss — kind-mismatch rule", () => {
  it("flags @pattern preceding a token declaration", () => {
    const css = `
@layer base {
  :root {
    /**
     * @pattern bg
     * @role Background
     * @example <div class="bg"></div>
     */
    --bg: white;
  }
}`;
    expect(rules(lint(css))).toContain("kind-mismatch");
  });

  it("flags @token preceding a class def", () => {
    const css = `
@layer components {
  /**
   * @token --bg
   * @category color
   * @role Background
   */
  .card { padding: 1rem; }
}`;
    expect(rules(lint(css))).toContain("kind-mismatch");
  });
});

describe("lintCss — strict scope (single @pattern claims one target)", () => {
  it("leaves the second class orphan when one @pattern precedes two class defs", () => {
    // Strict pairing: @pattern claims exactly the next class. Following classes
    // need their own annotation, so they surface as coverage violations.
    const css = `
@layer components {
  /**
   * @pattern card
   * @role A card
   * @example <article class="card"></article>
   */
  .card { padding: 1rem; }
  .stat-card { padding: 1rem; }
}`;
    expect(rules(lint(css))).toContain("coverage");
  });
});

describe("lintCss — no-duplicates rule", () => {
  it("flags two @pattern blocks with the same name", () => {
    const css = `
@layer components {
  /**
   * @pattern card
   * @role A card
   * @example <article class="card"></article>
   */
  .card { padding: 1rem; }
}
@layer utilities {
  /**
   * @pattern card
   * @role A card
   * @example <article class="card"></article>
   */
  .card { padding: 2rem; }
}`;
    expect(rules(lint(css))).toContain("no-duplicates");
  });
});

describe("lintCss — related-resolves rule", () => {
  it("flags @related referencing an unknown name", () => {
    const css = `
@layer components {
  /**
   * @pattern card
   * @role A card
   * @example <article class="card"></article>
   * @related ghost-card
   */
  .card { padding: 1rem; }
}`;
    expect(rules(lint(css))).toContain("related-resolves");
  });

  it("passes @related referencing a registered pattern", () => {
    const css = `
@layer components {
  /**
   * @pattern card
   * @role A card
   * @example <article class="card"></article>
   * @related stat-card
   */
  .card { padding: 1rem; }
  /**
   * @pattern stat-card
   * @role A stat card
   * @example <article class="stat-card"></article>
   */
  .stat-card { padding: 1rem; }
}`;
    expect(lint(css).violations).toEqual([]);
  });
});

describe("lintCss — registry shape", () => {
  it("captures modifiers from the @modifiers tag", () => {
    const css = `
@layer components {
  /**
   * @pattern card
   * @role A card
   * @example <article class="card"></article>
   * @modifiers ghost, invisible, glow
   */
  .card { padding: 1rem; }
}`;
    const r = lint(css);
    expect(r.violations).toEqual([]);
    expect(r.registry.patterns[0].modifiers).toEqual([
      "ghost",
      "invisible",
      "glow",
    ]);
  });

  it("records source line for patterns and tokens", () => {
    const r = lint(valid.pattern());
    expect(r.registry.patterns[0].source.declarationLine).toBeGreaterThan(0);
    expect(r.registry.patterns[0].source.annotationLine).toBeGreaterThan(0);
  });
});
