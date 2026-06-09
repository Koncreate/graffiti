<!--
  FAB Demo
  Floating action button: circular, fixed, elevated, safe-area-aware.
  Composes .button + .circle for surface/states + round footprint; .fab adds
  the fixed positioning + elevation. Always carries an aria-label (icon-only).
  Icons from Phosphor Icons (bold weight): https://phosphoricons.com/

  In a real app .fab is position: fixed against the viewport. Here it is pinned
  to a relative .box (position: absolute override) so it renders inside the demo.
-->
<div class="box" style="position: relative; height: 220px; overflow: hidden;">
  <p>Scrollable content sits behind the floating action button.</p>
  <button
    class="button primary circle fab"
    aria-label="Compose"
    style="position: absolute; inset-block-end: var(--pad-l); inset-inline-end: var(--pad-l);"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  </button>
</div>
