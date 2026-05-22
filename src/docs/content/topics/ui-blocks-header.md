---
id: header
title: Header
route: ui-blocks
order: 160
summary: Full-width site header with navigation.
when_to_use: Page-level site/app top navigation bar.
classes:
  - .header
  - .header.border
  - .header.sticky
  - .header.readable
demos:
  - Header
tags:
  - ui-blocks
  - navigation
---

## Basic Example

```html
<header class="header">
  <h1>Your Logo</h1>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</header>
```

## With Border

```html
<header class="header border">
  <h1>Your Logo</h1>
  <nav><!-- nav links --></nav>
</header>
```

## Sticky Header

Sticks to top when scrolling:

```html
<header class="header sticky">
  <h1>Your Logo</h1>
  <nav><!-- nav links --></nav>
</header>
```

## Combined Variants

```html
<header class="header border sticky">
  <h1>Your Logo</h1>
  <nav><!-- nav links --></nav>
</header>
```

## Readable (Centered with Rails)

Cap the header at `1400px` and centre it with layout padding — useful when the page below uses `.layout-readable`:

```html
<header class="header readable border">
  <h1>Your Logo</h1>
  <nav><!-- nav links --></nav>
</header>
```

## Styling Details

- Spans its parent — no inherent width constraint (add `.readable` to cap at 1400px)
- Flexbox with space-between, `--gap: 1rem` between children
- Nav `<ul>` styled as horizontal flex list
- All direct children have margin reset
- `.sticky` uses `--z-overlay` and a solid `var(--bg)` background
