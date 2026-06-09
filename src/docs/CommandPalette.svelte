<script lang="ts">
  import { goto } from "$app/navigation";
  import registry from "$lib/registry.json";
  import { getDocsContentGraph } from "./content/runtime.js";
  import { buildSearchIndex, searchIndex } from "./search/registry-search.js";

  let { open = $bindable(false) }: { open?: boolean } = $props();

  // Built once: registry (CSS-derived metadata) joined with the docs content
  // graph (topic frontmatter → navigation + titles).
  const index = buildSearchIndex(registry as never, getDocsContentGraph().topics);

  let query = $state("");
  let activeIndex = $state(0);
  let copiedKey = $state<string | null>(null);
  let dialogEl: HTMLDialogElement | null = $state(null);
  let inputEl: HTMLInputElement | null = $state(null);

  const results = $derived(searchIndex(index, query, { limit: 25 }));

  // Keep the active row valid as results change.
  $effect(() => {
    void results;
    activeIndex = 0;
  });

  // Drive the native <dialog> from the `open` flag.
  $effect(() => {
    if (!dialogEl) return;
    if (open && !dialogEl.open) {
      dialogEl.showModal();
      queueMicrotask(() => inputEl?.focus());
    } else if (!open && dialogEl.open) {
      dialogEl.close();
    }
  });

  function isTypingTarget(el: EventTarget | null): boolean {
    const node = el as HTMLElement | null;
    if (!node) return false;
    const tag = node.tagName;
    return (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT" ||
      node.isContentEditable
    );
  }

  function onWindowKeydown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    if ((event.metaKey || event.ctrlKey) && key === "k") {
      event.preventDefault();
      open = !open;
      return;
    }
    if (key === "/" && !open && !isTypingTarget(event.target)) {
      event.preventDefault();
      open = true;
    }
  }

  function move(delta: number) {
    if (!results.length) return;
    activeIndex = (activeIndex + delta + results.length) % results.length;
    queueMicrotask(() => {
      document
        .getElementById(`cmdk-option-${activeIndex}`)
        ?.scrollIntoView({ block: "nearest" });
    });
  }

  function onInputKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      select(activeIndex);
    }
  }

  async function copy(text: string | null, key: string) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      copiedKey = key;
      setTimeout(() => {
        if (copiedKey === key) copiedKey = null;
      }, 1200);
    } catch {
      // Clipboard can be blocked (insecure context); fail quietly.
    }
  }

  function select(i: number) {
    const result = results[i];
    if (!result) return;
    const { href, copy: copyText, key } = result.record;
    if (href) {
      open = false;
      goto(href);
    } else {
      // No documenting page — the useful action is grabbing the class.
      copy(copyText, key);
    }
  }

  function onDialogClick(event: MouseEvent) {
    // Click on the backdrop (the dialog element itself) closes it.
    if (event.target === dialogEl) open = false;
  }

  function onClose() {
    open = false;
    query = "";
  }
</script>

<svelte:window onkeydown={onWindowKeydown} />

<dialog
  bind:this={dialogEl}
  class="cmdk"
  onclick={onDialogClick}
  onclose={onClose}
  aria-label="Search components, tokens, and guides"
>
  <div class="cmdk-inner">
    <div class="cmdk-search">
      <svg class="cmdk-search-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      <!-- svelte-ignore a11y_autofocus -->
      <input
        bind:this={inputEl}
        bind:value={query}
        onkeydown={onInputKeydown}
        type="text"
        role="combobox"
        aria-expanded="true"
        aria-controls="cmdk-results"
        aria-activedescendant={results.length ? `cmdk-option-${activeIndex}` : undefined}
        aria-autocomplete="list"
        placeholder="Search classes, tokens, and guides…"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
      />
      <kbd class="cmdk-esc">esc</kbd>
    </div>

    {#if !query}
      <div class="cmdk-empty">
        <p class="text-faint">
          Search {index.length} classes, tokens &amp; guides from the framework metadata.
        </p>
        <div class="cmdk-jump">
          {#each [["Base", "/base"], ["Utilities", "/utilities"], ["Elements", "/elements"], ["UI Blocks", "/ui-blocks"]] as [label, href] (href)}
            <a class="tag" {href} onclick={() => (open = false)}>{label}</a>
          {/each}
        </div>
      </div>
    {:else if results.length === 0}
      <div class="cmdk-empty">
        <p class="text-faint">No matches for “{query}”.</p>
      </div>
    {:else}
      <ul id="cmdk-results" class="cmdk-results" role="listbox" aria-label="Results">
        {#each results as result, i (result.record.key)}
          {@const r = result.record}
          <li
            id={`cmdk-option-${i}`}
            class="cmdk-option"
            class:active={i === activeIndex}
            role="option"
            aria-selected={i === activeIndex}
            onclick={() => select(i)}
            onmousemove={() => (activeIndex = i)}
          >
            <div class="cmdk-option-main">
              <span class="cmdk-name">{r.display}</span>
              <span class="tag cmdk-kind">{r.section}</span>
              {#if r.deprecated}<span class="tag error">deprecated</span>{/if}
            </div>
            {#if r.role || r.summary}
              <span class="cmdk-role text-faint">{r.role || r.summary}</span>
            {/if}
            <div class="cmdk-actions">
              {#if r.copy}
                <button
                  type="button"
                  class="icon-button mini ghost"
                  aria-label={`Copy ${r.copy}`}
                  onclick={(event) => {
                    event.stopPropagation();
                    copy(r.copy, r.key);
                  }}
                >
                  {#if copiedKey === r.key}
                    <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16">
                      <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  {:else}
                    <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16">
                      <rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h10" fill="none" stroke="currentColor" stroke-width="2" />
                    </svg>
                  {/if}
                </button>
              {/if}
              {#if r.href}
                <svg class="cmdk-enter" viewBox="0 0 24 24" aria-hidden="true" width="16" height="16">
                  <path d="M9 10l-4 4 4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M5 14h10a4 4 0 0 0 4-4V6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              {/if}
            </div>
          </li>
        {/each}
      </ul>
    {/if}

    <div class="cmdk-footer text-faint">
      <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
      <span><kbd>↵</kbd> open</span>
      <span><kbd>esc</kbd> close</span>
    </div>
  </div>
</dialog>

<style>
  .cmdk {
    position: fixed;
    inset-block-start: 10vh;
    inset-inline: 0;
    margin-inline: auto;
    width: min(640px, 92vw);
    max-width: 92vw;
    padding: 0;
    border: 1px solid var(--fg-1);
    border-radius: var(--br-l, 16px);
    background: var(--bg);
    color: var(--fg);
    box-shadow: var(--shadow-xl, 0 24px 60px rgb(0 0 0 / 0.25));
    overflow: hidden;
  }

  .cmdk::backdrop {
    background: color-mix(in oklab, var(--fg) 30%, transparent);
    backdrop-filter: blur(2px);
  }

  .cmdk-inner {
    display: flex;
    flex-direction: column;
    max-height: min(72vh, 640px);
  }

  .cmdk-search {
    display: flex;
    align-items: center;
    gap: var(--vs-s, 0.5rem);
    padding: var(--pad-m, 0.9rem) var(--pad-l, 1.1rem);
    border-bottom: 1px solid var(--fg-1);
  }

  .cmdk-search-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    color: var(--fg-6);
  }

  .cmdk-search input {
    flex: 1;
    min-width: 0;
    border: none;
    background: transparent;
    color: inherit;
    font-size: var(--fs-m, 1.05rem);
    padding: 0;
    outline: none;
  }

  .cmdk-esc {
    flex-shrink: 0;
    font-size: var(--fs-xs, 0.75rem);
    color: var(--fg-6);
    border: 1px solid var(--fg-2);
    border-radius: var(--br-xs, 4px);
    padding: 0.1em 0.4em;
  }

  .cmdk-empty {
    padding: var(--pad-l, 1.25rem);
    display: flex;
    flex-direction: column;
    gap: var(--vs-m, 0.75rem);
  }

  .cmdk-jump {
    display: flex;
    flex-wrap: wrap;
    gap: var(--vs-s, 0.5rem);
  }

  .cmdk-results {
    list-style: none;
    margin: 0;
    padding: var(--pad-s, 0.5rem);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .cmdk-option {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas: "main actions" "role actions";
    align-items: center;
    column-gap: var(--vs-s, 0.5rem);
    padding: var(--pad-s, 0.55rem) var(--pad-m, 0.75rem);
    border-radius: var(--br-s, 8px);
    cursor: pointer;
  }

  .cmdk-option.active {
    background: color-mix(in oklab, var(--primary) 14%, transparent);
  }

  .cmdk-option-main {
    grid-area: main;
    display: flex;
    align-items: center;
    gap: var(--vs-s, 0.5rem);
    min-width: 0;
  }

  .cmdk-name {
    font-family: var(--font-mono, monospace);
    font-size: var(--fs-base, 0.95rem);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cmdk-kind {
    flex-shrink: 0;
  }

  .cmdk-role {
    grid-area: role;
    font-size: var(--fs-xs, 0.8rem);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cmdk-actions {
    grid-area: actions;
    display: flex;
    align-items: center;
    gap: var(--vs-xs, 0.35rem);
    color: var(--fg-6);
  }

  .cmdk-enter {
    opacity: 0;
  }

  .cmdk-option.active .cmdk-enter {
    opacity: 1;
    color: var(--primary);
  }

  .cmdk-footer {
    display: flex;
    gap: var(--vs-m, 1rem);
    padding: var(--pad-s, 0.5rem) var(--pad-l, 1.1rem);
    border-top: 1px solid var(--fg-1);
    font-size: var(--fs-xs, 0.75rem);
  }

  .cmdk-footer kbd,
  .cmdk-esc {
    font-family: var(--font-mono, monospace);
  }

  .cmdk-footer kbd {
    margin-inline-end: 0.15em;
  }

  @media (prefers-reduced-motion: no-preference) {
    .cmdk[open] {
      animation: cmdk-in 0.14s ease-out;
    }
  }

  @keyframes cmdk-in {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
  }
</style>
