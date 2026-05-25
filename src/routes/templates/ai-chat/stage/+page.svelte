<!--
  AI Chat template — Stage direction.

  Hero empty-state. Centered medallion + greeting + 4 suggestion cards +
  big composer + "continue last conversation" pickup. Shows what the
  user lands on when starting fresh.

  Persona: "Lumen" — a generalist agent for late-night work.

  Pairs with: theme-lumen (off-black + amber, glow accents). Swap the
  `class="theme-lumen"` on the outer wrapper for any other theme and
  the whole surface restates — primary color, glow, button shape,
  card lift, focus ring.

  Composes only Graffiti primitives — .layout-rail, .icon-rail,
  .chat-list, .sidebar-nav.compact, .app-shell, .layout-readable.center,
  .layout-card, .card, .composer, .chip, .callout, .brand-glow, .drawer.
  Inline styles are token-shaped overrides only — never raw colors.
-->

<svelte:head>
  <title>AI Chat · Stage · Graffiti templates</title>
</svelte:head>

<div class="layout-rail theme-lumen">
  <!-- ============================ Icon rail ============================ -->
  <aside class="icon-rail">
    <div class="brand" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2l3.1 6.3 7 1-5 4.9 1.1 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 7-1L12 2z" />
      </svg>
    </div>
    <a href="/templates/ai-chat/stage" aria-current="page" title="Lumen">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.6 4.8L18 9.4l-4.4 1.6L12 16l-1.6-4.8L6 9.4l4.4-1.6L12 3z" /></svg>
      <span class="status"></span>
    </a>
    <a href="/templates/ai-chat/stage" title="Atlas">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16.2 7.8l-2.2 6.4-6.4 2.2 2.2-6.4 6.4-2.2z" /></svg>
    </a>
    <a href="/templates/ai-chat/stage" title="Spool">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18l6-6-6-6" /><path d="M8 6l-6 6 6 6" /></svg>
    </a>
    <a href="/templates/ai-chat/stage" title="Marble">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1-1-2-2-2H4c-1 0-2 1-2 2v6c0 1 1 2 2 2h3" /><path d="M14 21c3 0 7-1 7-8V5c0-1-1-2-2-2h-4c-1 0-2 1-2 2v6c0 1 1 2 2 2h3" /></svg>
    </a>
    <div class="spacer"></div>
    <a href="/templates/ai-chat/stage" title="Account">
      <span class="avatar s">EK</span>
    </a>
  </aside>

  <!-- ============================ Chat list ============================ -->
  <aside class="chat-list">
    <header class="stack" style="--gap: var(--vs-xs);">
      <div class="split center">
        <p><strong>Lumen</strong></p>
        <span class="chip">★</span>
      </div>
      <button class="primary full" type="button">+ New conversation</button>
      <input type="search" placeholder="Search…" />
    </header>
    <div class="scroll stack" style="--gap: var(--vs-s);">
      <div class="stack" style="--gap: var(--vs-xs);">
        <p class="sidebar-nav-heading">Pinned</p>
        <nav class="sidebar-nav compact" style="--sn-color: var(--primary);">
          <a href="/templates/ai-chat/stage">★ Renaming the launch</a>
        </nav>
      </div>
      <div class="stack" style="--gap: var(--vs-xs);">
        <p class="sidebar-nav-heading">Last 7 days</p>
        <nav class="sidebar-nav compact">
          <a href="/templates/ai-chat/stage">A poem for my daughter's birthday</a>
          <a href="/templates/ai-chat/stage">Compare three new espresso machines</a>
          <a href="/templates/ai-chat/stage">How does HSTS preload work?</a>
          <a href="/templates/ai-chat/stage">Plan a 4-day Lisbon trip in October</a>
          <a href="/templates/ai-chat/stage">Translate the contract clause to plain English</a>
        </nav>
      </div>
      <div class="stack" style="--gap: var(--vs-xs);">
        <p class="sidebar-nav-heading">Earlier</p>
        <nav class="sidebar-nav compact">
          <a href="/templates/ai-chat/stage">The Stoics on small annoyances</a>
          <a href="/templates/ai-chat/stage">A reading list on city design</a>
        </nav>
      </div>
    </div>
  </aside>

  <!-- ============================== Main stage ============================== -->
  <!-- The stage variant strips the header border and lets the theme's dark
       canvas show through — `--surface-bg: transparent` is structural, not
       a color decision (the theme decides what shows through). -->
  <section class="app-shell surface" style="--surface-bg: transparent;">
    <header class="header cluster" style="--gap: var(--vs-s); border-block-end: 0;">
      <button class="drawer-toggle minimal" popovertarget="lumen-drawer" aria-label="Open menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
      </button>
      <span class="chip">★ Lumen</span>
      <span class="chip mono">claude-opus-4.5</span>
      <div class="spacer"></div>
      <button class="minimal" type="button" aria-label="Account">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="11" r="4" /></svg>
      </button>
    </header>

    <main style="display: grid; place-items: center; padding: var(--vs-xl);">
      <div class="layout-readable center stack" style="--max-width: 720px; --gap: var(--vs-l);">
        <!-- Hero medallion + greeting -->
        <div class="stack text-center" style="--gap: var(--vs-xs);">
          <div class="brand-glow circle" style="inline-size: 3.5rem; block-size: 3.5rem; display: inline-grid; place-items: center; margin-inline: auto; margin-block-end: var(--vs-m);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.1 6.3 7 1-5 4.9 1.1 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 7-1L12 2z" /></svg>
          </div>
          <h1>Good evening, Elena.</h1>
          <p class="text-faint">What are we working on tonight?</p>
        </div>

        <!-- Suggestion cards -->
        <div class="layout-card" style="--min-card-width: 280px; --layout-gap: var(--vs-s);">
          <button type="button" class="card stack" style="--gap: var(--vs-xs); text-align: start;">
            <div class="cluster" style="--gap: var(--vs-xs);">
              <span class="circle" style="inline-size: 1.75rem; block-size: 1.75rem; display: grid; place-items: center; background: var(--fg-05); color: var(--primary);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 21c3 0 7-1 7-8V5c0-1-1-2-2-2H4c-1 0-2 1-2 2v6c0 1 1 2 2 2h3" /><path d="M14 21c3 0 7-1 7-8V5c0-1-1-2-2-2h-4c-1 0-2 1-2 2v6c0 1 1 2 2 2h3" /></svg>
              </span>
              <span class="sidebar-nav-heading" style="color: var(--primary);">Write</span>
            </div>
            <p><strong>A toast for my sister's wedding</strong></p>
            <p class="text-faint fs-xs">warm, 90 seconds, one good line</p>
          </button>

          <button type="button" class="card stack" style="--gap: var(--vs-xs); text-align: start;">
            <div class="cluster" style="--gap: var(--vs-xs);">
              <span class="circle" style="inline-size: 1.75rem; block-size: 1.75rem; display: grid; place-items: center; background: var(--fg-05); color: var(--primary);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10" /><path d="M16.2 7.8l-2.2 6.4-6.4 2.2 2.2-6.4 6.4-2.2z" /></svg>
              </span>
              <span class="sidebar-nav-heading" style="color: var(--primary);">Research</span>
            </div>
            <p><strong>Why are eggs so expensive in 2026?</strong></p>
            <p class="text-faint fs-xs">include sources</p>
          </button>

          <button type="button" class="card stack" style="--gap: var(--vs-xs); text-align: start;">
            <div class="cluster" style="--gap: var(--vs-xs);">
              <span class="circle" style="inline-size: 1.75rem; block-size: 1.75rem; display: grid; place-items: center; background: var(--fg-05); color: var(--primary);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M16 18l6-6-6-6" /><path d="M8 6l-6 6 6 6" /></svg>
              </span>
              <span class="sidebar-nav-heading" style="color: var(--primary);">Build</span>
            </div>
            <p><strong>A landing page for a coffee subscription</strong></p>
            <p class="text-faint fs-xs">Graffiti default theme</p>
          </button>

          <button type="button" class="card stack" style="--gap: var(--vs-xs); text-align: start;">
            <div class="cluster" style="--gap: var(--vs-xs);">
              <span class="circle" style="inline-size: 1.75rem; block-size: 1.75rem; display: grid; place-items: center; background: var(--fg-05); color: var(--primary);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 3v18h18" /><path d="M7 16V9" /><path d="M12 16V5" /><path d="M17 16v-4" /></svg>
              </span>
              <span class="sidebar-nav-heading" style="color: var(--primary);">Analyze</span>
            </div>
            <p><strong>Compare last quarter to this one</strong></p>
            <p class="text-faint fs-xs">from the attached CSV</p>
          </button>
        </div>

        <!-- Hero composer -->
        <form class="composer" action="/templates/ai-chat/stage" method="get">
          <textarea name="message" rows="3" placeholder="Ask Lumen anything…"></textarea>
          <div class="toolbar">
            <button type="button" class="chip">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.5l-9 9a6 6 0 0 1-8.5-8.5l9-9a4 4 0 1 1 5.7 5.7L8.5 19.5" /></svg>
              Attach
            </button>
            <button type="button" class="chip">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" /></svg>
              Web
            </button>
            <button type="button" class="chip">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M16 18l6-6-6-6" /><path d="M8 6l-6 6 6 6" /></svg>
              Run code
            </button>
            <div class="spacer"></div>
            <button type="button" class="minimal" aria-label="Voice">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><path d="M12 19v4" /></svg>
            </button>
            <button class="primary" type="submit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l7-7 7 7" /><path d="M12 19V5" /></svg>
              Send
            </button>
          </div>
        </form>

        <!-- Continue last conversation -->
        <div class="callout ghost cluster" style="border-style: dashed;">
          <span class="circle" style="inline-size: 2rem; block-size: 2rem; display: grid; place-items: center; color: var(--primary); background: color-mix(in oklab, var(--primary) 12%, transparent);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></svg>
          </span>
          <div class="stack" style="--gap: 0; flex: 1;">
            <p><strong>Continue: "Renaming the launch"</strong></p>
            <p class="text-faint fs-xs">You were down to three: <em>Aurora</em>, <em>Holdfast</em>, <em>Marker</em>. Pick up where we left off?</p>
          </div>
          <button type="button" class="chip">Resume →</button>
        </div>

        <p class="text-faint fs-xs text-center">Lumen makes mistakes. Verify what matters.</p>
      </div>
    </main>
  </section>
</div>

<!-- Mobile drawer -->
<aside id="lumen-drawer" popover="auto" class="drawer">
  <header class="cluster split" style="padding: var(--pad-m); border-block-end: var(--border-1);">
    <strong>Lumen</strong>
    <button type="button" class="minimal" popovertarget="lumen-drawer" popovertargetaction="hide" aria-label="Close">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
    </button>
  </header>
  <div class="stack" style="padding: var(--pad-m); --gap: var(--vs-xs);">
    <button class="primary full" type="button">+ New conversation</button>
    <input type="search" placeholder="Search…" />
  </div>
  <div class="stack" style="flex: 1; overflow-y: auto; padding: var(--pad-s); --gap: var(--vs-xs);">
    <p class="sidebar-nav-heading">Last 7 days</p>
    <nav class="sidebar-nav compact">
      <a href="/templates/ai-chat/stage">A poem for my daughter's birthday</a>
      <a href="/templates/ai-chat/stage">Compare three new espresso machines</a>
      <a href="/templates/ai-chat/stage">Plan a 4-day Lisbon trip</a>
    </nav>
  </div>
</aside>

<style>
  /* Template owns one structural fact: the rail fills its parent. Theme
     carries everything else — surface tiers, composer glow, brand-glow
     halo, card hover-lift, button pill shape, focus rings. */
  .layout-rail {
    block-size: 100dvh;
  }
</style>
