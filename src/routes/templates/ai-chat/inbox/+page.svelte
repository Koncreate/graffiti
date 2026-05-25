<!--
  AI Chat template — Inbox direction.

  Async, multi-participant feed. Messages are grouped feed rows (NOT
  bubbles) — each row is an avatar + sender + timestamp + body. Day
  dividers. Right rail shows participants + pinned items.

  Persona: "Loop" — async team agent that drafts standups, summarizes
  customer threads, answers when mentioned.

  Pairs with: theme-signal (alert-red + presence-blue).
  Swap the `class="theme-signal"` on the outer wrapper for any other
  theme — colors, density, badge styling, presence dots all restate.

  Composes only Graffiti primitives — .layout-rail (with-workbench),
  .icon-rail, .chat-list, .sidebar-nav.compact, .cluster, .stack,
  .box, .log-card, .callout, .chip, .badge, .avatar, .presence,
  .composer, .drawer. The few inline styles are token-shaped overrides
  (--gap, grid-template-columns) — never raw colors.
-->

<svelte:head>
  <title>AI Chat · Inbox · Graffiti templates</title>
</svelte:head>

<div
  class="layout-rail with-workbench theme-signal"
  style="grid-template-columns: auto 18rem minmax(0, 1fr) 17rem;"
>
  <!-- ============================ Icon rail ============================ -->
  <aside class="icon-rail">
    <div class="brand" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 12h-6l-2 3h-4l-2-3H2" />
        <path d="M5.5 5h13a2 2 0 0 1 2 1.6l1.5 6.4v5a2 2 0 0 1-2 2h-17a2 2 0 0 1-2-2v-5L4 6.6A2 2 0 0 1 5.5 5z" />
      </svg>
    </div>
    <a href="/templates/ai-chat/inbox" aria-current="page" title="Loop">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></svg>
      <span class="status"></span>
    </a>
    <a href="/templates/ai-chat/inbox" title="Pulse">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8" /><path d="M5 8h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z" /><path d="M2 14h2" /><path d="M20 14h2" /></svg>
    </a>
    <a href="/templates/ai-chat/inbox" title="Atlas">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16.2 7.8l-2.2 6.4-6.4 2.2 2.2-6.4 6.4-2.2z" /></svg>
    </a>
    <div class="spacer"></div>
    <a href="/templates/ai-chat/inbox" title="Account">
      <span class="avatar s">JM</span>
    </a>
  </aside>

  <!-- ============================ Inbox list ============================ -->
  <aside class="chat-list">
    <header class="stack" style="--gap: var(--vs-xs);">
      <div class="split center">
        <p><strong>Inbox</strong></p>
        <span class="badge">4 new</span>
      </div>
      <div class="cluster" style="--gap: 4px;">
        <button type="button" class="chip selected">All</button>
        <button type="button" class="chip">Mentions</button>
        <button type="button" class="chip">Drafts</button>
        <button type="button" class="chip">Done</button>
      </div>
    </header>
    <div class="scroll" style="padding: 0;">
      <nav class="sidebar-nav compact" style="--sn-color: var(--primary);">
        <a href="/templates/ai-chat/inbox" aria-current="page">
          <span class="avatar s" style="background: var(--primary); color: var(--bg);">L</span>
          <div class="stack" style="--gap: 0; flex: 1; min-inline-size: 0;">
            <p><strong>Loop · Daily standup</strong></p>
            <p class="text-faint fs-xs">Pulled 4 updates from Linear, 2 PRs merged…</p>
          </div>
          <div class="stack text-end" style="--gap: 4px;">
            <span class="text-faint fs-xs">10m</span>
            <span class="badge">2</span>
          </div>
        </a>
        <a href="/templates/ai-chat/inbox">
          <span class="avatar s" style="background: var(--accent); color: var(--bg);">S</span>
          <div class="stack" style="--gap: 0; flex: 1; min-inline-size: 0;">
            <p>Sasha · Spec review needed</p>
            <p class="text-faint fs-xs">Could you take a look at the bullets in §3?</p>
          </div>
          <span class="text-faint fs-xs">23m</span>
        </a>
        <a href="/templates/ai-chat/inbox">
          <span class="avatar s" style="background: var(--primary); color: var(--bg);">L</span>
          <div class="stack" style="--gap: 0; flex: 1; min-inline-size: 0;">
            <p><strong>Loop · Q3 close checklist</strong></p>
            <p class="text-faint fs-xs">12 of 18 items done. Owners pinged.</p>
          </div>
          <div class="stack text-end" style="--gap: 4px;">
            <span class="text-faint fs-xs">1h</span>
            <span class="badge">3</span>
          </div>
        </a>
        <a href="/templates/ai-chat/inbox">
          <span class="avatar s" style="background: var(--pink); color: var(--bg);">M</span>
          <div class="stack" style="--gap: 0; flex: 1; min-inline-size: 0;">
            <p>Maya · Lunch tomorrow?</p>
            <p class="text-faint fs-xs">Pho? The new place on 5th.</p>
          </div>
          <span class="text-faint fs-xs">Yesterday</span>
        </a>
        <a href="/templates/ai-chat/inbox">
          <span class="avatar s" style="background: var(--success); color: var(--bg);">P</span>
          <div class="stack" style="--gap: 0; flex: 1; min-inline-size: 0;">
            <p>Pulse · Weekly metrics digest</p>
            <p class="text-faint fs-xs">Retention rose 1.4 pp WoW, mostly…</p>
          </div>
          <span class="text-faint fs-xs">Mon</span>
        </a>
      </nav>
    </div>
  </aside>

  <!-- ============================== Thread ============================== -->
  <section class="app-shell surface" style="--surface-bg: var(--bg);">
    <header class="header border cluster" style="--gap: var(--vs-s);">
      <button class="drawer-toggle minimal" popovertarget="loop-drawer" aria-label="Open menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
      </button>
      <span class="avatar" style="background: var(--primary); color: var(--bg);">L</span>
      <div class="stack" style="--gap: 0;">
        <p><strong>Loop · Daily standup</strong></p>
        <p class="text-faint fs-xs">4 participants · async since Mon</p>
      </div>
      <div class="spacer"></div>
      <button class="minimal" type="button" aria-label="Pin">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 17v5" /><path d="M9 10.8V3h6v7.8a4 4 0 0 1 2 3.4V17H7v-2.8a4 4 0 0 1 2-3.4z" /></svg>
      </button>
      <button class="minimal" type="button" aria-label="Mark done">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6L9 17l-5-5" /></svg>
      </button>
    </header>

    <main class="hide-scrollbar momentum-scroll">
      <div class="stack" style="--gap: var(--vs-m); padding: var(--vs-l) var(--vs-xl);">
        <!-- Day divider -->
        <div class="cluster" style="--gap: var(--vs-s);">
          <hr style="flex: 1;" />
          <p class="sidebar-nav-heading">Today · Tue, May 20</p>
          <hr style="flex: 1;" />
        </div>

        <!-- Loop opener -->
        <article class="cluster" style="--gap: var(--vs-s); align-items: start;">
          <span class="avatar" style="background: var(--primary); color: var(--bg);">L</span>
          <div class="stack" style="--gap: var(--vs-s); flex: 1; min-inline-size: 0;">
            <div class="cluster" style="--gap: var(--vs-xs);">
              <strong>Loop</strong>
              <span class="chip">AI</span>
              <span class="text-faint fs-xs">9:00 AM</span>
            </div>
            <p>Morning. Here's what changed overnight across the team's Linear and Slack channels.</p>
            <ul>
              <li>2 PRs merged into <code>main</code> (auth, settings)</li>
              <li>1 incident resolved · <code>INC-2826</code> (45m, P1)</li>
              <li>Sasha posted a spec for review</li>
              <li>3 customer messages tagged "billing"</li>
            </ul>
            <div class="log-card" style="max-inline-size: max-content;">
              <header>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                <span class="label">standup-2026-05-20.md</span>
                <span class="status">4.1KB</span>
              </header>
            </div>
          </div>
        </article>

        <!-- Sasha -->
        <article class="cluster" style="--gap: var(--vs-s); align-items: start;">
          <span class="avatar" style="background: var(--accent); color: var(--bg);">S</span>
          <div class="stack" style="--gap: var(--vs-xs); flex: 1; min-inline-size: 0;">
            <div class="cluster" style="--gap: var(--vs-xs);">
              <strong>Sasha</strong>
              <span class="text-faint fs-xs">9:14 AM</span>
            </div>
            <p>Spec link, when anyone has 20 min: <a href="#">linear.app/team/SPEC-441</a>. Mainly want eyes on §3 — the migration ordering.</p>
          </div>
        </article>

        <!-- You -->
        <article class="cluster" style="--gap: var(--vs-s); align-items: start;">
          <span class="avatar" style="background: var(--fg); color: var(--bg);">JM</span>
          <div class="stack" style="--gap: var(--vs-xs); flex: 1; min-inline-size: 0;">
            <div class="cluster" style="--gap: var(--vs-xs);">
              <strong>You</strong>
              <span class="text-faint fs-xs">9:22 AM</span>
            </div>
            <p>I'll take §3 before noon. Loop, can you summarize the customer billing messages?</p>
          </div>
        </article>

        <!-- Loop reply -->
        <article class="cluster" style="--gap: var(--vs-s); align-items: start;">
          <span class="avatar" style="background: var(--primary); color: var(--bg);">L</span>
          <div class="stack" style="--gap: var(--vs-s); flex: 1; min-inline-size: 0;">
            <div class="cluster" style="--gap: var(--vs-xs);">
              <strong>Loop</strong>
              <span class="chip">AI</span>
              <span class="text-faint fs-xs">9:22 AM</span>
            </div>
            <p>Three threads, all this week:</p>
            <div class="cluster" style="--gap: var(--vs-xs);">
              <span class="chip">Refund timing (Acme)</span>
              <span class="chip">Annual upgrade math (Pintos)</span>
              <span class="chip">VAT line item (Konsole)</span>
            </div>
            <p>None blocking. Common thread: invoices are unclear about the proration window. Want me to draft a help-center note?</p>
            <div class="cluster" style="--gap: var(--vs-xs);">
              <button type="button" class="chip">Draft help-center note</button>
              <button type="button" class="chip">Reply to all 3</button>
              <button type="button" class="chip">Snooze 'til Thu</button>
            </div>
          </div>
        </article>
      </div>
    </main>

    <footer style="padding: var(--pad-m); border-block-start: var(--border-1);">
      <form class="composer" action="/templates/ai-chat/inbox" method="get">
        <textarea name="message" rows="1" placeholder="Reply, or @Loop to ask an agent…"></textarea>
        <div class="toolbar">
          <button type="button" class="minimal" aria-label="Mention">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.9 7.9" /></svg>
          </button>
          <button type="button" class="minimal" aria-label="Attach">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.5l-9 9a6 6 0 0 1-8.5-8.5l9-9a4 4 0 1 1 5.7 5.7L8.5 19.5" /></svg>
          </button>
          <div class="spacer"></div>
          <span class="chip">Async</span>
          <button class="primary" type="submit">Send</button>
        </div>
      </form>
    </footer>
  </section>

  <!-- ====================== Right participants rail ====================== -->
  <aside class="stack" style="--gap: var(--vs-l); border-inline-start: var(--border-1); padding: var(--pad-m); background: var(--bg); overflow: hidden;">
    <div class="stack" style="--gap: var(--vs-xs);">
      <p class="sidebar-nav-heading">Participants</p>
      <ul class="stack no-list" style="--gap: var(--vs-xs);">
        <li class="cluster" style="--gap: var(--vs-xs);">
          <span class="avatar s" style="position: relative; background: var(--primary); color: var(--bg);">L<span class="presence" style="position: absolute; inset: auto -1px -1px auto;"></span></span>
          <div class="stack" style="--gap: 0; flex: 1;">
            <p class="cluster" style="--gap: 6px;">Loop <span class="chip">AI</span></p>
            <p class="text-faint fs-xs">Online</p>
          </div>
        </li>
        <li class="cluster" style="--gap: var(--vs-xs);">
          <span class="avatar s" style="position: relative; background: var(--fg); color: var(--bg);">JM<span class="presence" style="position: absolute; inset: auto -1px -1px auto;"></span></span>
          <div class="stack" style="--gap: 0; flex: 1;">
            <p>You</p>
            <p class="text-faint fs-xs">Online</p>
          </div>
        </li>
        <li class="cluster" style="--gap: var(--vs-xs);">
          <span class="avatar s" style="position: relative; background: var(--accent); color: var(--bg);">S<span class="presence" style="position: absolute; inset: auto -1px -1px auto;"></span></span>
          <div class="stack" style="--gap: 0; flex: 1;">
            <p>Sasha</p>
            <p class="text-faint fs-xs">Online</p>
          </div>
        </li>
        <li class="cluster" style="--gap: var(--vs-xs);">
          <span class="avatar s" style="position: relative; background: var(--pink); color: var(--bg);">M<span class="presence away" style="position: absolute; inset: auto -1px -1px auto;"></span></span>
          <div class="stack" style="--gap: 0; flex: 1;">
            <p>Maya</p>
            <p class="text-faint fs-xs">Away · DND</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="stack" style="--gap: var(--vs-xs);">
      <p class="sidebar-nav-heading">Pinned</p>
      <ul class="stack no-list" style="--gap: var(--vs-xs);">
        <li class="box" style="padding: var(--pad-xs);">
          <p><strong>Standup format</strong></p>
          <p class="text-faint fs-xs">doc</p>
        </li>
        <li class="box" style="padding: var(--pad-xs);">
          <p><strong>Sasha's spec — SPEC-441</strong></p>
          <p class="text-faint fs-xs">linear</p>
        </li>
      </ul>
    </div>
  </aside>
</div>

<!-- Mobile drawer -->
<aside id="loop-drawer" popover="auto" class="drawer">
  <header class="cluster split" style="padding: var(--pad-m); border-block-end: var(--border-1);">
    <strong>Inbox</strong>
    <button type="button" class="minimal" popovertarget="loop-drawer" popovertargetaction="hide" aria-label="Close">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
    </button>
  </header>
  <div style="padding: var(--pad-m);">
    <p class="sidebar-nav-heading">Agents</p>
    <nav class="sidebar-nav compact">
      <a href="/templates/ai-chat/inbox" aria-current="page">Loop · Async</a>
      <a href="/templates/ai-chat/inbox">Pulse · Metrics</a>
      <a href="/templates/ai-chat/inbox">Atlas · Research</a>
    </nav>
  </div>
</aside>

<style>
  /* Template owns one structural fact: the rail fills its parent. Theme
     carries everything else — colors, density, badges, presence, borders,
     hover, shadows. */
  .layout-rail {
    block-size: 100dvh;
    background: var(--bg);
    color: var(--fg);
  }
</style>
