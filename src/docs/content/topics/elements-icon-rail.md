---
id: icon-rail
title: Icon Rail
route: elements
order: 265
summary: Narrow vertical column of icon buttons with active state and optional status dot.
when_to_use: Workspace shells, agent switchers, tool palettes — any vertical nav sliver next to a wider sidebar.
classes:
  - .icon-rail
  - .icon-rail > .brand
  - .icon-rail > .status
  - .icon-rail > .spacer
demos:
  - IconRail
tags:
  - elements
  - navigation
---

`.icon-rail` is a narrow vertical column of icon buttons. Drop in agent
switchers, tool palettes, workspace shells. Pair with [`.layout-rail`](/utilities#layouts)
for a rail + sidebar + main app shell.

## Basic Usage

```html
<aside class="icon-rail">
  <div class="brand" aria-hidden="true">
    <svg>…</svg>
  </div>
  <a href="/atlas" aria-current="page" title="Atlas">
    <svg>…</svg>
    <span class="status"></span>
  </a>
  <a href="/scribe" title="Scribe"><svg>…</svg></a>
  <div class="spacer"></div>
  <a href="/account" title="Account">
    <span class="avatar s">EK</span>
  </a>
</aside>
```

## Anatomy

- `.icon-rail` — vertical container (`inline-size: --rail-size`, default `4rem`).
- `.brand` — square top-of-rail mark on the primary color. Place a logo or sigil.
- `> a`, `> button` — icon rows. Active row uses `aria-current="page"` or
  `aria-pressed="true"`; hover and focus pick up `--fg-1` / `--shadow-1`.
- `> .status` — optional 8px green dot in the bottom-trailing corner of a row,
  for "currently active" / "online" affordance.
- `> .spacer` — `flex: 1` filler to push the next children to the bottom.

## Composition

Sits left of a `.layout-sidebar`, sub-sidebar (`.chat-list` or similar), or
inside `.layout-rail`:

```html
<div class="layout-rail">
  <aside class="icon-rail">…</aside>
  <aside class="chat-list">…</aside>
  <section class="app-shell">…</section>
</div>
```

## CSS Variables

- `--rail-size` — width of the rail (default `4rem`)
