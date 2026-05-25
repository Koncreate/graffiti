<!--
  AI Chat template — Studio direction.

  Rebuilt on the chat-pattern additions proposed for v4.30:
    .layout-rail, .icon-rail, .composer, .log-card, .bubble.thinking /
    .bubble.streaming, .chat-thread anatomy plus existing .callout / .chip /
    .cluster / .stack / .drawer / .sidebar-nav primitives.

  Persona: "Atlas" — a research analyst. The template demonstrates the full
  message anatomy in one screen: user bubble, tool calls (.log-card),
  assistant answer with footnoted citations (.callout), streaming next
  turn (.bubble.streaming), suggested follow-ups (.cluster + .chip),
  composer with toolbar (.composer).

  Apply any theme by class on the outer wrapper:
    class="theme-studio"     warm violet (D Workshop's vibe)
    class="theme-signal"     alert-red async / inbox energy
    class="theme-lumen"      off-black + amber, hero
    class="theme-editorial"  Fraunces serif, paper cream
    class="theme-system"     financial-terminal density
-->

<svelte:head>
  <title>AI Chat · Graffiti templates</title>
</svelte:head>

<div class="layout-rail">
  <!-- ============================ Icon rail ============================ -->
  <aside class="icon-rail">
    <div class="brand" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3l1.6 4.8L18 9.4l-4.4 1.6L12 16l-1.6-4.8L6 9.4l4.4-1.6L12 3z" />
      </svg>
    </div>
    <a href="/templates/ai-chat" aria-current="page" title="Atlas">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M16.2 7.8l-2.2 6.4-6.4 2.2 2.2-6.4 6.4-2.2z" />
      </svg>
      <span class="status"></span>
    </a>
    <a href="/templates/ai-chat" title="Scribe">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    </a>
    <a href="/templates/ai-chat" title="Pair">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 18l6-6-6-6" />
        <path d="M8 6l-6 6 6 6" />
      </svg>
    </a>
    <a href="/templates/ai-chat" title="Critic">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 21c3 0 7-1 7-8V5c0-1-1-2-2-2H4c-1 0-2 1-2 2v6c0 1 1 2 2 2h3" />
        <path d="M14 21c3 0 7-1 7-8V5c0-1-1-2-2-2h-4c-1 0-2 1-2 2v6c0 1 1 2 2 2h3" />
      </svg>
    </a>
    <div class="spacer"></div>
    <a href="/templates/ai-chat" title="Account">
      <span class="avatar s" style="background: var(--blue-opaque-3); color: var(--blue);">EK</span>
    </a>
  </aside>

  <!-- ============================ Chat list ============================ -->
  <aside class="chat-list">
    <header class="stack" style="--gap: var(--vs-s);">
      <div class="split center">
        <p><strong>Atlas</strong></p>
        <span class="chip" style="font-size: 0.7rem;">Research</span>
      </div>
      <button class="primary" type="button" style="inline-size: 100%;">+ New conversation</button>
      <input type="search" placeholder="Search…" />
    </header>
    <div class="scroll">
      <nav class="sidebar-nav compact" style="--sn-color: var(--primary);">
        <p class="sidebar-nav-heading">Today</p>
        <a href="/templates/ai-chat" aria-current="page">
          <div class="stack" style="--gap: var(--vs-xs);">
            <p><strong>Q3 retention readout</strong></p>
            <p class="text-faint fs-xs">12 sources · 4:18 PM</p>
          </div>
        </a>
        <a href="/templates/ai-chat">
          <div class="stack" style="--gap: var(--vs-xs);">
            <p><strong>Compare cohort definitions</strong></p>
            <p class="text-faint fs-xs">8 sources · 11:02 AM</p>
          </div>
        </a>
        <p class="sidebar-nav-heading">Yesterday</p>
        <a href="/templates/ai-chat">
          <div class="stack" style="--gap: var(--vs-xs);">
            <p><strong>What changed in pricing?</strong></p>
            <p class="text-faint fs-xs">21 sources</p>
          </div>
        </a>
        <a href="/templates/ai-chat">
          <div class="stack" style="--gap: var(--vs-xs);">
            <p><strong>Competitor landscape — May</strong></p>
            <p class="text-faint fs-xs">14 sources</p>
          </div>
        </a>
        <p class="sidebar-nav-heading">Earlier</p>
        <a href="/templates/ai-chat">
          <div class="stack" style="--gap: var(--vs-xs);">
            <p><strong>SOC2 evidence list</strong></p>
            <p class="text-faint fs-xs">3 sources</p>
          </div>
        </a>
      </nav>
    </div>
  </aside>

  <!-- ============================== Main ============================== -->
  <section class="app-shell surface" style="--surface-bg: var(--bg);">
    <header class="header border" style="display: flex; align-items: center; gap: var(--vs-s);">
      <button class="drawer-toggle minimal" popovertarget="atlas-drawer" aria-label="Open menu" style="padding: var(--pad-xs);">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>
      <div class="cluster" style="--gap: var(--vs-xs);">
        <span class="avatar bordered" style="background: var(--blue-opaque-2); color: var(--blue);">AT</span>
        <div class="stack" style="--gap: 0;">
          <p><strong>Q3 retention readout</strong></p>
          <p class="text-faint fs-xs">atlas · 12 sources · 4 turns</p>
        </div>
      </div>
      <div style="flex: 1;"></div>
      <span class="chip">Research</span>
      <span class="chip" style="font-size: 0.7rem; font-family: ui-monospace, monospace;">claude-opus-4.5</span>
    </header>

    <main class="hide-scrollbar momentum-scroll">
      <div class="chat-thread">
        <!-- User -->
        <div class="chat-row self">
          <article class="chat-message stack text-end" style="--gap: var(--vs-xs);">
            <p class="text-faint fs-xs"><strong>You</strong> · 4:14 PM</p>
            <div class="bubble" style="--bubble-bg: var(--blue-opaque-1); --bubble-border: var(--blue-opaque-3);">
              <p>Did our Q3 retention number actually move, or is the dashboard lagging? Pull the underlying cohort data and the last engineering changelog.</p>
            </div>
          </article>
        </div>

        <!-- Tool calls -->
        <div class="chat-row">
          <article class="chat-message stack" style="--gap: var(--vs-s);">
            <p class="text-faint fs-xs"><strong>Atlas</strong> · using tools</p>
            <div class="log-card">
              <header>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 21l-4.3-4.3" /><circle cx="10.5" cy="10.5" r="7.5" /></svg>
                <span class="label">query.warehouse</span>
                <span class="status">✓ 412ms</span>
              </header>
              <pre>select cohort_month, retained_30d
from analytics.user_retention
where cohort_month &gt;= '2025-07-01'</pre>
            </div>
            <div class="log-card">
              <header>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                <span class="label">github.changelog</span>
                <span class="status">✓ 286ms</span>
              </header>
              <p class="text-faint fs-xs" style="margin: 0;">Read <span style="font-family: ui-monospace, monospace;">CHANGELOG.md</span> on <span style="font-family: ui-monospace, monospace;">main</span> · 7 entries since Jul 1.</p>
            </div>
          </article>
        </div>

        <!-- Assistant answer -->
        <div class="chat-row">
          <article class="chat-message stack" style="--gap: var(--vs-s);">
            <p class="text-faint fs-xs"><strong>Atlas</strong> · 4:15 PM</p>
            <div class="bubble">
              <p>The dashboard is correct — D30 retention <strong>did</strong> drop, from 38.4% (Jun) to 31.9% (Sep). Two changes line up:</p>
              <ul>
                <li><strong>Jul 18</strong> — paywall moved from D14 to D7 <span class="text-faint">[1]</span></li>
                <li><strong>Aug 02</strong> — onboarding step removed for invited users <span class="text-faint">[2]</span></li>
              </ul>
              <p>The Aug 02 change is the larger contributor (≈4.1 pp). I'd recommend reverting the onboarding cut for invited cohorts first; the paywall change is paying for itself in revenue.</p>
            </div>

            <!-- Citations as .callout with numbered gutter badge -->
            <div class="stack" style="--gap: var(--vs-xs);">
              <p class="text-faint fs-xs" style="text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">Sources</p>
              <a class="callout" href="#" style="padding: var(--pad-s) var(--pad-m); text-decoration: none; color: inherit;">
                <span style="flex: 0 0 auto; display: grid; place-items: center; inline-size: 1.5rem; block-size: 1.5rem; border-radius: 999px; background: var(--primary); color: var(--bg); font-size: 0.75rem; font-weight: 600;">1</span>
                <div class="stack" style="--gap: 2px;">
                  <p class="text-faint fs-xs" style="margin: 0; text-transform: uppercase; letter-spacing: 0.04em;">Github · CHANGELOG.md</p>
                  <p style="margin: 0; line-height: 1.3;">Move free-tier paywall trigger from D14 to D7</p>
                </div>
              </a>
              <a class="callout" href="#" style="padding: var(--pad-s) var(--pad-m); text-decoration: none; color: inherit;">
                <span style="flex: 0 0 auto; display: grid; place-items: center; inline-size: 1.5rem; block-size: 1.5rem; border-radius: 999px; background: var(--primary); color: var(--bg); font-size: 0.75rem; font-weight: 600;">2</span>
                <div class="stack" style="--gap: 2px;">
                  <p class="text-faint fs-xs" style="margin: 0; text-transform: uppercase; letter-spacing: 0.04em;">Linear · GROWTH-841</p>
                  <p style="margin: 0; line-height: 1.3;">Drop "set up team" step for invited users</p>
                </div>
              </a>
            </div>

            <!-- Follow-ups — .cluster + .chip -->
            <div class="cluster" style="--gap: var(--vs-xs); padding-block-start: var(--vs-xs);">
              <button class="chip" type="button">Show the cohort chart</button>
              <button class="chip" type="button">Draft the revert PR</button>
              <button class="chip" type="button">Compare to Q2</button>
            </div>
          </article>
        </div>

        <!-- Streaming next turn -->
        <div class="chat-row self">
          <article class="chat-message stack text-end" style="--gap: var(--vs-xs);">
            <p class="text-faint fs-xs"><strong>You</strong> · just now</p>
            <div class="bubble" style="--bubble-bg: var(--blue-opaque-1); --bubble-border: var(--blue-opaque-3);">
              <p>Show me the cohort chart and write a one-paragraph summary I can paste in #growth.</p>
            </div>
          </article>
        </div>

        <div class="chat-row">
          <article class="chat-message stack" style="--gap: var(--vs-xs);">
            <p class="text-faint fs-xs"><strong>Atlas</strong> · writing</p>
            <div class="bubble streaming">
              <p>Charting cohort retention by month, indexed to the Jul launch…</p>
            </div>
          </article>
        </div>
      </div>
    </main>

    <footer style="padding: var(--pad-m); border-block-start: var(--border-1);">
      <form class="composer" action="/templates/ai-chat" method="get">
        <textarea name="message" rows="2" placeholder="Ask Atlas anything about Q3…"></textarea>
        <div class="toolbar">
          <button type="button" class="minimal" style="padding: var(--pad-xs);" aria-label="Attach">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.5l-9 9a6 6 0 0 1-8.5-8.5l9-9a4 4 0 1 1 5.7 5.7L8.5 19.5" /></svg>
          </button>
          <button type="button" class="minimal" style="padding: var(--pad-xs);" aria-label="Mention">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.9 7.9" /></svg>
          </button>
          <span class="chip" style="font-size: 0.7rem;">web</span>
          <span class="chip" style="font-size: 0.7rem;">warehouse</span>
          <div class="spacer"></div>
          <span class="text-faint fs-xs">⌘↵</span>
          <button class="primary" type="submit">Send</button>
        </div>
      </form>
    </footer>
  </section>
</div>

<!-- ====================== Mobile drawer (popover) ======================
  At <768px the .icon-rail and .chat-list hide; this drawer slides in
  from the left when the .drawer-toggle in the header is tapped. It
  carries all the navigation: agents at the top, conversations below,
  account row at the bottom. No bottom tab bar.
-->
<aside id="atlas-drawer" popover="auto" class="drawer">
  <header class="cluster" style="padding: var(--pad-m); border-block-end: var(--border-1); justify-content: space-between;">
    <div class="cluster" style="--gap: var(--vs-xs);">
      <span class="avatar s bordered" style="background: var(--blue); color: var(--bg);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 3l1.6 4.8L18 9.4l-4.4 1.6L12 16l-1.6-4.8L6 9.4l4.4-1.6L12 3z" /></svg>
      </span>
      <strong>Atlas</strong>
    </div>
    <button type="button" class="minimal" popovertarget="atlas-drawer" popovertargetaction="hide" aria-label="Close" style="padding: 4px;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
    </button>
  </header>

  <div style="padding: var(--pad-m) var(--pad-m) var(--pad-s);">
    <p class="text-faint fs-xs" style="text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; margin-block-end: var(--vs-xs);">Agents</p>
    <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 2px;">
      <li>
        <a href="/templates/ai-chat" aria-current="page" style="display: flex; align-items: center; gap: var(--pad-s); padding: var(--pad-xs) var(--pad-s); border-radius: var(--br-m); background: var(--blue-opaque-1); color: var(--blue); text-decoration: none;">
          <span style="inline-size: 2rem; block-size: 2rem; border-radius: var(--br-m); display: grid; place-items: center; background: var(--blue); color: var(--bg);">AT</span>
          <div style="flex: 1;">
            <p style="margin: 0; font-weight: 600;">Atlas</p>
            <p class="text-faint fs-xs" style="margin: 0;">Research</p>
          </div>
        </a>
      </li>
      <li>
        <a href="/templates/ai-chat" style="display: flex; align-items: center; gap: var(--pad-s); padding: var(--pad-xs) var(--pad-s); border-radius: var(--br-m); color: inherit; text-decoration: none;">
          <span style="inline-size: 2rem; block-size: 2rem; border-radius: var(--br-m); display: grid; place-items: center; background: var(--fg-05); color: var(--fg-6);">SC</span>
          <div style="flex: 1;">
            <p style="margin: 0;">Scribe</p>
            <p class="text-faint fs-xs" style="margin: 0;">Writing</p>
          </div>
        </a>
      </li>
      <li>
        <a href="/templates/ai-chat" style="display: flex; align-items: center; gap: var(--pad-s); padding: var(--pad-xs) var(--pad-s); border-radius: var(--br-m); color: inherit; text-decoration: none;">
          <span style="inline-size: 2rem; block-size: 2rem; border-radius: var(--br-m); display: grid; place-items: center; background: var(--fg-05); color: var(--fg-6);">PR</span>
          <div style="flex: 1;">
            <p style="margin: 0;">Pair</p>
            <p class="text-faint fs-xs" style="margin: 0;">Coding</p>
          </div>
        </a>
      </li>
    </ul>
  </div>

  <div class="stack" style="padding: var(--vs-xs) var(--pad-m); --gap: var(--vs-xs); border-block-start: var(--border-1);">
    <button class="primary" type="button" style="inline-size: 100%;">+ New conversation</button>
    <input type="search" placeholder="Search Atlas…" />
  </div>

  <div style="flex: 1; overflow-y: auto; padding: var(--pad-s);">
    <nav class="sidebar-nav compact" style="--sn-color: var(--primary);">
      <p class="sidebar-nav-heading">Today</p>
      <a href="/templates/ai-chat" aria-current="page">
        <div class="stack" style="--gap: var(--vs-xs);">
          <p><strong>Q3 retention readout</strong></p>
          <p class="text-faint fs-xs">12 sources · 4:18 PM</p>
        </div>
      </a>
      <a href="/templates/ai-chat">
        <div class="stack" style="--gap: var(--vs-xs);">
          <p><strong>Compare cohort definitions</strong></p>
          <p class="text-faint fs-xs">8 sources · 11:02 AM</p>
        </div>
      </a>
      <p class="sidebar-nav-heading">Yesterday</p>
      <a href="/templates/ai-chat">
        <div class="stack" style="--gap: var(--vs-xs);">
          <p><strong>What changed in pricing?</strong></p>
          <p class="text-faint fs-xs">21 sources</p>
        </div>
      </a>
    </nav>
  </div>

  <footer style="padding: var(--pad-s) var(--pad-m); border-block-start: var(--border-1); display: flex; align-items: center; gap: var(--vs-xs); background: var(--fg-05);">
    <span class="avatar s" style="background: var(--blue-opaque-3); color: var(--blue);">EK</span>
    <div style="flex: 1; min-inline-size: 0;">
      <p style="margin: 0;"><strong>Elena Kim</strong></p>
      <p class="text-faint fs-xs" style="margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">elena@example.com</p>
    </div>
    <button type="button" class="minimal" style="padding: 4px;" aria-label="Settings">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3" /></svg>
    </button>
  </footer>
</aside>

<style>
  /* Local sizing for the shell — keep the rail/list/main from leaking
     past the viewport. All other styling comes from drop-in.css. */
  .layout-rail {
    block-size: 100dvh;
    background: var(--bg);
    color: var(--fg);
  }
</style>
