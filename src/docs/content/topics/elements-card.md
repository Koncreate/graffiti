---
id: card
title: Card
route: elements
order: 250
summary: A padded surface for grouped content. Reach for header, footer, or media only when you need a divided bar or edge-to-edge media.
when_to_use: Grouped content, linked previews, and pricing tiles.
classes:
  - .card
  - .card.linked
  - .card.featured
demos:
  - Card
  - FeaturedCard
  - StatCard
  - FeatureCard
tags:
  - elements
  - containers
---

## Basic Card

The card itself is the padded surface — drop content directly inside. No wrapper, no body class.

```html
<article class="card">
  <h3>Open invoices</h3>
  <p>Three invoices are awaiting payment. The earliest is due May 1.</p>
</article>
```

Children stack vertically with a small built-in gap. Override it inline with `--gap` when you want more breathing room:

```html
<article class="card" style="--gap: var(--vs-m);">
  <h3>Weekly digest</h3>
  <p>A summary of project activity, delivered every Friday morning.</p>
  <button class="primary">Subscribe</button>
</article>
```

## Linked Card

Use `.card.linked` on an anchor for clickable cards. It applies link-reset styles and an interactive affordance (hover/focus/active states):

```html
<a class="card linked" href="/docs/release-notes">
  <h3>Release notes</h3>
  <p>Read what changed in the latest update.</p>
</a>
```

## With Header or Footer

Add a direct `<header>` or `<footer>` only when you want a divided bar with a separator. They bleed edge-to-edge through the card's padding automatically.

```html
<article class="card">
  <header>
    <h3>Starter Plan</h3>
    <span class="tag">Popular</span>
  </header>
  <p>Everything you need to get started quickly.</p>
  <footer>
    <button class="primary">Choose plan</button>
    <button class="ghost">Details</button>
  </footer>
</article>
```

## With Media

Direct `<img>`, `<picture>`, or `<figure>` children bleed edge-to-edge too. At the top or bottom of the card they extend through that side's padding.

```html
<article class="card">
  <figure style="aspect-ratio: 16 / 9; background: var(--fg-05);"></figure>
  <h3>Release notes</h3>
  <p>Highlights from the latest update.</p>
</article>
```

## Notes

- `.card` is the padded surface. Don't wrap content in an extra `<div>`.
- Children stack with `gap: var(--gap, var(--vs-s))`. Override with `style="--gap: var(--vs-m);"`.
- `<header>`, `<footer>`, and `<img>`/`<picture>`/`<figure>` direct children bleed to the card edge — use them only when you actually want that treatment.
- Skip headers and footers for simple cards. Most cards don't need them.
