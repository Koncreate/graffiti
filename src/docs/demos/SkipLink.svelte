<!--
  SkipLink Demo
  .skip-link is screen-reader-only until it receives keyboard focus, so it is
  invisible by default. The first box is live (Tab into it to reveal); the
  second is a forced-visible preview of the focused state.
-->
<div class="stack">
  <div class="box">
    <a class="skip-link" href="#main">Skip to content</a>
    <p>Press <kbd>Tab</kbd> here to reveal the skip link.</p>
    <p id="main">It pins to the top-start of its containing block on keyboard focus.</p>
  </div>

  <div class="box preview">
    <p class="fs-xs text-muted">Revealed state (shown here for preview; normally visible only on focus):</p>
    <a class="skip-link" href="#main">Skip to content</a>
  </div>
</div>

<style>
  /* Give the absolutely-positioned link a containing block, and reserve a band
     at the top so the revealed pill doesn't overlap the caption. */
  .preview {
    position: relative;
    padding-block-start: 3rem;
  }
  /* Force the revealed (focused) position without touching framework CSS. */
  .preview .skip-link {
    translate: -50% 0;
  }
</style>
