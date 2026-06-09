---
id: fab
title: Floating Action Button
route: elements
order: 115
summary: Circular, fixed-position primary action pinned above the safe area.
when_to_use: A single, high-emphasis action that should stay reachable while content scrolls (compose, add, new message).
classes:
  - .fab
  - .button
  - .circle
demos:
  - Fab
tags:
  - elements
  - mobile
  - actions
---

The `.fab` is a floating action button: a circular, elevated control pinned to
the bottom-inline-end corner of the viewport, clear of the device safe area. It
is composition-first — `.button` supplies the surface, color variant, hover lift,
and focus ring, `.circle` supplies the round footprint, and `.fab` adds only the
fixed positioning and a stronger elevation shadow.

## Basic Usage

```html
<button class="button primary circle fab" aria-label="Compose">
  <svg aria-hidden="true">…</svg>
</button>
```

- It carries a single icon, so it must always have an `aria-label` — the same
  icon-only naming convention `.tip` and `.icon-button` rely on.
- The inner `<svg>` should be `aria-hidden="true"` so the label is the one
  accessible name.

## Positioning and Safe Areas

- `position: fixed`, pinned with `inset-block-end: calc(var(--safe-bottom) + var(--pad-l))`
  and `inset-inline-end: calc(var(--safe-right) + var(--pad-l))` so it clears the
  home indicator and rounded display corners.
- Layered at `var(--z-sticky)` to sit above scrolling content, matching the
  `.bottom-nav` stacking convention.
- Elevation is `var(--shadow-4)` — one step stronger than `.bottom-nav` since the
  FAB floats higher in the stack.
- Default footprint is `--size: 56px` (the Material-standard FAB size); override
  `--size` for a mini or extended variant.

## Composing with Bottom Nav

When a `.bottom-nav` is present, lift the FAB so it clears the tab bar by
overriding its bottom inset:

```html
<button
  class="button primary circle fab"
  aria-label="New message"
  style="inset-block-end: calc(var(--safe-bottom) + var(--pad-l) + 64px);"
>
  <svg aria-hidden="true">…</svg>
</button>
```

## Motion and Accessibility

- The hover lift comes from `.button` and degrades automatically under the global
  `prefers-reduced-motion` guard — `.fab` introduces no animation of its own.
- Keyboard focus shows the shared focus ring inherited from `.button`.
- Because it is a real `<button>`, it works with zero JavaScript and is fully
  keyboard and screen-reader operable.
