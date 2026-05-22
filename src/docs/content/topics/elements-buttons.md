---
id: buttons
title: Buttons
route: elements
order: 100
summary: Button styling for `<button>` elements and `.button` class for links.
when_to_use: Buttons and links styled as actions.
classes:
  - .button
  - .primary
  - .success
  - .warning
  - .error
  - .ghost
  - .minimal
  - .dark
  - .light
  - .contrast
  - .mini
demos:
  - Buttons
tags:
  - elements
  - actions
---

## Variants

```html
<button>Default</button>
<button class="primary">Primary</button>
<button class="success">Success</button>
<button class="warning">Warning</button>
<button class="error">Error</button>
<button class="ghost">Ghost</button>
<button class="minimal">Minimal</button>
```

## Surface Variants

`.dark`, `.light`, and `.contrast` keep a fixed surface regardless of theme. Use them on buttons that need to sit on a particular surface (e.g., a `.dark` hero) and stay legible.

```html
<button class="dark">Always dark</button>
<button class="light">Always light</button>
<button class="contrast">Inverts against current scheme</button>
```

## Links as Buttons

```html
<a href="/signup" class="button primary">Sign Up</a>
<a href="/learn-more" class="button ghost">Learn More</a>
```

## Mini Buttons

Smaller padding for compact buttons:

```html
<button class="mini">Small</button>
<button class="primary mini">Small Primary</button>
```

## Reset Utility

`.reset` is a general-purpose utility (not a button variant) for stripping native chrome from any element. It removes background, border, radius, shadow, and padding while inheriting typography and color — useful when you want a `<button>` to behave like a bare interactive surface.

```html
<button class="reset" type="button">Icon trigger</button>
```

## Disabled State

```html
<button disabled>Disabled</button>
<button class="primary" disabled>Disabled Primary</button>
```

## Custom Color

Override with `--button-color`:

```html
<button style="--button-color: var(--purple)">Custom</button>
```

## Button Groups

Use `.cluster` for horizontal button groups:

```html
<div class="cluster">
  <button>Cancel</button>
  <button class="primary">Save</button>
</div>
```

Right-align with `justify-content`:

```html
<div class="cluster" style="justify-content: flex-end;">
  <button>Cancel</button>
  <button class="primary">Save</button>
</div>
```

## Styling Details

- All buttons have consistent padding and border-radius
- Hover, focus, and active states included
- Disabled state reduces opacity and prevents interaction
