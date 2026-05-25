<div class="stack">
  <p class="text-faint fs-xs">
    Narrow vertical column of icon buttons. Pair with <code>.layout-rail</code> for
    a rail + sidebar + main shell. Active row uses <code>aria-current="page"</code>
    or <code>aria-pressed="true"</code>; an optional <code>.status</code> dot adorns
    a row.
  </p>

  <div style="block-size: 22rem; border: var(--border-1); border-radius: var(--br-m); overflow: hidden;">
    <aside class="icon-rail">
      <div class="brand" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3l1.6 4.8L18 9.4l-4.4 1.6L12 16l-1.6-4.8L6 9.4l4.4-1.6L12 3z" />
        </svg>
      </div>
      <a href="#atlas" aria-current="page" title="Atlas">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M16.2 7.8l-2.2 6.4-6.4 2.2 2.2-6.4 6.4-2.2z" />
        </svg>
        <span class="status"></span>
      </a>
      <a href="#scribe" title="Scribe">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </a>
      <a href="#pair" title="Pair">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 18l6-6-6-6" />
          <path d="M8 6l-6 6 6 6" />
        </svg>
      </a>
      <div class="spacer"></div>
      <a href="#account" title="Account">
        <span class="avatar s" style="background: var(--blue-opaque-3); color: var(--blue);">EK</span>
      </a>
    </aside>
  </div>
</div>
