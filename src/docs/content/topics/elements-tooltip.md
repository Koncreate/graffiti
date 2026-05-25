---
id: tooltip
title: Tooltip
route: elements
order: 320
summary: Hover tooltips using CSS anchor positioning. No JavaScript required.
when_to_use: Popover-based tooltips with CSS anchor positioning.
classes:
  - .tip
  - .tooltip
  - .bottom
  - .left
  - .right
demos:
  - Tooltip
tags:
  - elements
  - overlays
---

Two patterns share the same visuals — pick by content shape.

## Standalone `.tip` (Plain Text via `aria-label`)

Apply `.tip` directly to an icon button (or any focusable element) and put the label text on `aria-label`. The same string is the screen-reader accessible name *and* the visible tooltip — one source of truth, no duplication.

```html
<button class="tip" aria-label="Save to draft">
  <svg>…</svg>
</button>
```

Position modifiers go on the same element:

```html
<button class="tip bottom" aria-label="Delete">…</button>
<button class="tip left" aria-label="Settings">…</button>
<button class="tip right" aria-label="Search">…</button>
```

This pattern is best for **icon-only buttons** where the tooltip text *is* the accessible name. The pseudo-element reads `attr(aria-label)`, so it can only render plain text — no markup, links, or nested elements. For those, use the rich pattern below.

> **Don't combine `.tip` with visible text content.** `<button class="tip" aria-label="Save to draft">Save</button>` would override the visible "Save" label with "Save to draft" for screen readers — that fails WCAG 2.5.3 (Label in Name). When the element already has a visible label and the tooltip is a *supplemental description*, use the rich pattern below with `aria-describedby` pointing at the tip.

## Rich Content (`.tooltip` Wrapper + Child `.tip`)

Wrap the trigger and tip body in `.tooltip` when you need formatted markup (links, icons, multi-line content):

```html
<span class="tooltip">
  <button>Help</button>
  <span class="tip">See <a href="/docs">docs</a> for details.</span>
</span>
```

Position modifiers go on the wrapper:

```html
<span class="tooltip">
  <button>Top</button>
  <span class="tip">Above the element</span>
</span>

<span class="tooltip bottom">
  <button>Bottom</button>
  <span class="tip">Below the element</span>
</span>

<span class="tooltip left">
  <button>Left</button>
  <span class="tip">Left side</span>
</span>

<span class="tooltip right">
  <button>Right</button>
  <span class="tip">Right side</span>
</span>
```

For accessibility on rich tooltips with already-labeled triggers, give the `.tip` an `id` and reference it from the trigger with `aria-describedby`:

```html
<span class="tooltip">
  <button aria-describedby="save-tip">Save</button>
  <span class="tip" id="save-tip">Saves to your local draft folder.</span>
</span>
```

## Styling Details

- Uses CSS anchor positioning (`anchor-scope`, `position-anchor`, `position-area`)
- Background: `var(--bg)`
- Border: `var(--border-1)`
- Shadow: `var(--shadow-3)`
- Max width: `30ch` (wraps longer text)
- Shows on `:hover` and `:focus-visible` / `:focus-within`
- Smooth opacity transition (`var(--d-fast)` / `var(--ease-smooth)`)

## Picking a Pattern

| Use case | Pattern |
|---|---|
| Icon-only button, tip text = accessible name | `<button class="tip" aria-label="…">` |
| Element with visible label, tip is supplemental | `.tooltip` wrapper + child `.tip` + `aria-describedby` |
| Tip body needs links, icons, or multi-line markup | `.tooltip` wrapper + child `.tip` |
