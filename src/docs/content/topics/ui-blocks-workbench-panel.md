---
id: workbench-panel
title: Workbench Panel
route: ui-blocks
order: 240
summary: Right-aligned pane with a tabbed body — artifact viewer, properties inspector, code preview.
when_to_use: IDE-shaped surfaces — agent artifacts, file previews, properties inspectors, anything that wants a "right rail" alongside the main reading column.
classes:
  - .workbench-panel
  - .workbench-panel > header
  - .workbench-panel > header > .tabs
  - .workbench-panel > .body
demos:
  - WorkbenchPanel
tags:
  - ui-blocks
  - layout
---

`.workbench-panel` is a right-aligned content pane with a tabbed header
and a scrolling body. Pairs with [`.layout-rail.with-workbench`](/utilities#layouts)
to build IDE-shaped surfaces.

## Basic Usage

```html
<aside class="workbench-panel">
  <header>
    <p><strong>Q3 retention</strong></p>
    <div class="tabs">
      <button type="button" aria-pressed="true">Preview</button>
      <button type="button">Code</button>
      <button type="button">Spec</button>
    </div>
  </header>
  <div class="body">
    <!-- artifact, preview, properties — anything -->
  </div>
</aside>
```

## Anatomy

- `> header` — title row with a `.tabs` group pushed to the trailing end.
  Tab activation uses `aria-pressed="true"` (no `aria-selected` — there's no
  ARIA tab semantics implied; treat each as an independent toggle that the
  consumer wires up).
- `> .body` — the scrolling content area (`flex: 1; overflow: auto`).

## Layout

Pair with `.layout-rail.with-workbench` for a 4-column shell (rail / list /
main / workbench). On mobile (`<768px` container width), the workbench
collapses with the other rail children.

```html
<div class="layout-rail with-workbench">
  <aside class="icon-rail">…</aside>
  <aside class="chat-list">…</aside>
  <section class="app-shell">…</section>
  <aside class="workbench-panel">…</aside>
</div>
```
