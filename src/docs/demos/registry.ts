const demoModules = import.meta.glob<{ default: unknown }>("./*.svelte");
const demoRawModules = import.meta.glob<string>("./*.svelte", {
  query: "?raw",
  import: "default",
});

// Optional hand-authored HTML source for the displayed "Code" view. A demo with
// a sibling `<Name>.html` shows that framework-free markup instead of its
// `.svelte` source. This lets a demo render however it must — e.g. via `{@html}`
// for customizable-select markup that Svelte's compiler rejects — while the docs
// only ever display plain HTML. Graffiti is a CSS library, not a Svelte one.
const demoHtmlModules = import.meta.glob<string>("./*.html", {
  query: "?raw",
  import: "default",
});

export interface DemoEntry {
  component: () => Promise<{ default: unknown }>;
  code: () => Promise<string>;
}

const demoEntries = Object.keys(demoModules)
  .sort((a, b) => a.localeCompare(b))
  .map((path) => {
    const name = path.replace("./", "").replace(/\.svelte$/, "");
    // Prefer the HTML companion for what we display; fall back to the source.
    const codeLoader = demoHtmlModules[`./${name}.html`] ?? demoRawModules[path];

    if (!codeLoader) {
      throw new Error(`Missing raw demo loader for ${path}`);
    }

    return [
      name,
      {
        component: demoModules[path],
        code: codeLoader,
      },
    ] as const;
  });

export const demoRegistry: Record<string, DemoEntry> =
  Object.fromEntries(demoEntries);

export function getDemo(name: string): DemoEntry | undefined {
  return demoRegistry[name];
}

export function hasDemo(name: string): boolean {
  return name in demoRegistry;
}
