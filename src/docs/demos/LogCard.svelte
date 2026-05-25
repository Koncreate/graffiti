<div class="stack">
  <div class="log-card">
    <header>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M21 21l-4.3-4.3" />
        <circle cx="10.5" cy="10.5" r="7.5" />
      </svg>
      <span class="label">query.warehouse</span>
      <span class="status">✓ 412ms</span>
    </header>
    <pre>select cohort_month, retained_30d
from analytics.user_retention
where cohort_month &gt;= '2025-07-01'</pre>
  </div>

  <div class="log-card">
    <header>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
      <span class="label">github.changelog</span>
      <span class="status">✓ 286ms</span>
    </header>
    <p class="text-faint fs-xs" style="margin: 0;">
      Read <span style="font-family: ui-monospace, monospace;">CHANGELOG.md</span> on
      <span style="font-family: ui-monospace, monospace;">main</span> — 7 entries since Jul 1.
    </p>
  </div>

  <div class="log-card">
    <header>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
      <span class="label">deploy.build</span>
      <span class="status">… running</span>
    </header>
  </div>
</div>
