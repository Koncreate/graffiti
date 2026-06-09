<!--
  Toolbar Demo
  Icons from Phosphor Icons (bold weight): https://phosphoricons.com/
-->
<div class="stack">
  <p class="text-faint fs-xs">
    A wrapping flex row of controls. Slot a <code>.separator</code> to divide
    groups and a <code>.spacer</code> to push trailing controls to the end.
  </p>

  <div class="toolbar box" style="padding: var(--pad-xs);">
    <button type="button" class="minimal" style="padding: var(--pad-xs);" aria-label="Bold">
      <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M170 116a40 40 0 0 0-26-70H80a12 12 0 0 0-12 12v140a12 12 0 0 0 12 12h76a44 44 0 0 0 14-86Zm-66-46h40a16 16 0 0 1 0 32h-40Zm52 116h-52v-32h52a16 16 0 0 1 0 32Z" /></svg>
    </button>
    <button type="button" class="minimal" style="padding: var(--pad-xs);" aria-label="Italic">
      <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M204 56a12 12 0 0 1-12 12h-28l-44 120h20a12 12 0 0 1 0 24H64a12 12 0 0 1 0-24h28l44-120h-20a12 12 0 0 1 0-24h76a12 12 0 0 1 12 12Z" /></svg>
    </button>
    <span class="separator"></span>
    <button type="button" class="minimal" style="padding: var(--pad-xs);" aria-label="Insert link">
      <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M137 167a12 12 0 0 1 0 17l-14 13a52 52 0 0 1-73-73l28-28a52 52 0 0 1 76 4 12 12 0 1 1-18 16 28 28 0 0 0-41-2l-28 28a28 28 0 0 0 40 40l13-14a12 12 0 0 1 17 0Zm68-100a52 52 0 0 0-74 0l-13 14a12 12 0 0 0 17 17l14-13a28 28 0 0 1 40 40l-28 28a28 28 0 0 1-41-2 12 12 0 0 0-18 16 52 52 0 0 0 76 4l28-28a52 52 0 0 0 0-74Z" /></svg>
    </button>
    <span class="spacer"></span>
    <button class="primary" type="button">Done</button>
  </div>
</div>
