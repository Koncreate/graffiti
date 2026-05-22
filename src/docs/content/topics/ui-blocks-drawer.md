---
id: drawer
title: Drawer
route: ui-blocks
order: 145
summary: Popover-driven slide-in panel that anchors to any edge — left, right, top, or bottom.
when_to_use: Side navigation, mobile bottom sheets, filter panels, and any popover surface that should fly in from a screen edge.
classes:
  - .drawer
  - .left
  - .right
  - .end
  - .top
  - .bottom
demos:
  - Drawer
tags:
  - ui-blocks
  - popover
  - overlay
---

`.drawer` is a single primitive with four edge anchors. It rides on the native `[popover]` attribute, so opening and closing requires zero JavaScript — use `popovertarget` on a button.

## Basic Example

By default, the drawer anchors to the inline start (the left edge in LTR).

```html
<button popovertarget="nav">Open</button>

<aside id="nav" popover class="drawer">
  <!-- drawer contents -->
</aside>
```

## Direction Modifiers

Add `.right`, `.top`, or `.bottom` to re-anchor the drawer to that edge. The slide-in animation, border placement, and sizing follow the edge.

```html
<aside popover class="drawer right"><!-- slides in from the right --></aside>
<aside popover class="drawer top"><!-- drops down from the top --></aside>
<aside popover class="drawer bottom"><!-- rises up from the bottom --></aside>
```

`.end` is an alias for `.right` (matches the historical sidebar convention).

## Direction Reference

| Class     | Anchors to | Slide direction | Sizing                                          |
| --------- | ---------- | --------------- | ----------------------------------------------- |
| _(none)_  | Left       | From left       | `--drawer-inline-size` wide, capped at `85vw`   |
| `.right`  | Right      | From right      | `--drawer-inline-size` wide, capped at `85vw`   |
| `.top`    | Top        | From top        | Full width, up to `85dvh`                       |
| `.bottom` | Bottom     | From bottom     | Full width, up to `85dvh`                       |

Left/right drawers are hard-capped at `max-inline-size: 85vw` — pushing `--drawer-inline-size` past that clamps to the cap.

## CSS Custom Properties

```css
.drawer {
  --drawer-inline-size: 300px; /* Width for left/right drawers */
  --drawer-bg: var(--bg);       /* Surface color */
  --drawer-border: var(--border-1); /* Edge border */
  --drawer-backdrop: 0.5;       /* Backdrop opacity when open */
}
```

## Bottom Sheet Pattern

`.drawer.bottom` is the modern, accessible bottom sheet — full-width slide-up with a scrim and proper focus management courtesy of the popover API.

```html
<button popovertarget="filters">Filters</button>

<aside id="filters" popover class="drawer bottom">
  <header><h3>Filters</h3></header>
  <!-- ... -->
  <button popovertarget="filters" popovertargetaction="hide">Done</button>
</aside>
```

## Notes

- The drawer uses `[popover]`, so it gets a backdrop, focus trapping, and ESC-to-close for free.
- All directions animate via `translate` + `@starting-style`. No JavaScript required.
- Top and bottom drawers cap at `85dvh` so they never block the entire viewport.
