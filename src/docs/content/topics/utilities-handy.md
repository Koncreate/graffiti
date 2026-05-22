---
id: handy
title: Handy Stuff
route: utilities
order: 300
summary: Helper classes for common styling needs.
when_to_use: Common reset, visibility, width, and helper utilities.
classes:
  - .readable
  - .no-list
  - .circle
  - .row
  - .visually-hidden
  - .auto-color
  - .full
  - .fc
demos:
  - Readable
  - NoList
  - Circle
  - Row
  - VisuallyHidden
  - AutoColor
  - AspectRatio
  - FluidContainer
tags:
  - utilities
  - helpers
---

## Display & Layout

```html
<div class="flex">Flexbox with gap (--gap, default 1rem)</div>
<div class="grid">Grid with gap (--gap, default 1rem)</div>
<div class="split">Space-between flex with gap</div>
<div class="split vertical">Vertical split (top/bottom)</div>
```

## Readable Width

```html
<div class="readable">Max-width 900px container</div>
```

## List Reset

```html
<ul class="no-list">
  <li>No bullets, margin, or padding</li>
</ul>
```

## Spacing

```html
<div class="row">Adds vertical margin (--vs-m)</div>
<h3 class="no-margin">Zero margin</h3>
```

In forms and fieldsets, `.row` also works as a field-group wrapper (label + control + help text).

## Width

```html
<input class="full" type="email" />
<button class="button full">Full-width action</button>
```

Use `.readable` or `.narrow` when you also need max-width constraints.

## Visibility

```html
<span class="visually-hidden"
  >Hidden visually, accessible to screen readers</span
>
<div class="no-print">Hidden when printing</div>
```

## Shape

```html
<div class="circle">Circular element (40px default)</div>
```

Customize size:

```html
<div class="circle" style="--size: 60px;">Larger circle</div>
```

## Aspect Ratio

```html
<div class="aspect-square">1:1</div>
<div class="aspect-video">16:9</div>
<div class="aspect-4-3">4:3</div>
<div class="aspect-21-9">21:9</div>
```

## Fluid Container

`.fc` (alias: `.fluid-text-container`) turns the element into an inline-size container query root and switches fluid typography to container-query units (`cqi`) instead of viewport units. Use it on any region whose type should scale with the region's width — sidebars, cards, modals — not the viewport.

```html
<section class="fc">
  <h2>Scales with this section's width, not the viewport</h2>
</section>
```

## Auto Color

Automatically sets text color based on background:

```html
<div class="auto-color" style="--bg-color: var(--blue);">
  White text on blue
</div>
<div class="auto-color" style="--bg-color: var(--yellow);">
  Black text on yellow
</div>
```

With tinted text:

```html
<div class="auto-color chroma" style="--bg-color: var(--blue);">
  Slightly tinted text
</div>
```

## Validation States

`.error`, `.success`, and `.warning` set border colours on form controls (and are scoped to a few other components like `.callout`, `.tag`, `.timeline li`, `.sidebar-nav`). They do not style generic text — a `<small>` placed after an input gets caption spacing but inherits the parent's color.

```html
<input class="error" />
<small>Please enter a valid email</small>

<input class="success" />
<small>Username is available</small>

<input class="warning" />
<small>Password is weak</small>
```

For prominent inline status messages, use `<div class="callout error">…</div>` instead.

## Full Bleed

Break out of `.layout-readable` container:

```html
<div class="layout-readable">
  <p>Normal width content</p>
  <img class="full-bleed" src="wide.jpg" />
  <p>Back to normal width</p>
</div>
```

## Focus Ring

Consistent focus styling for interactive elements:

```html
<button class="focus-ring">Outline offset 2px on focus</button>
<button class="focus-ring-inset">Outline offset -2px (inset) on focus</button>
```

## Transitions

Apply smooth transitions using the easing tokens:

```html
<div class="transition">All properties, 0.2s, ease-smooth</div>
<div class="transition-fast">All properties, 0.1s, ease-smooth</div>
<div class="transition-slow">All properties, 0.4s, ease-smooth</div>
<div class="transition-bounce">All properties, 0.3s, ease-bounce</div>
<div class="transition-none">Disable transitions</div>
```
