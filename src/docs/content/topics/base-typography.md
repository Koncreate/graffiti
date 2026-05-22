---
id: typography
title: Typography
route: base
order: 100
summary: Fluid typography defaults that scale predictably across viewport and container sizes.
when_to_use: Default text hierarchy, heading utilities, and responsive type sizing.
classes:
  - h1
  - h2
  - h3
  - h4
  - h5
  - h6
  - .h1
  - .h2
  - .h3
  - .h4
  - .h5
  - .h6
  - .fs-xs
  - .fs-base
  - .fs-s
  - .fs-m
  - .fs-l
  - .fs-xl
  - .fs-xxl
  - .fs-xxxl
  - .fc
  - --ls-h1
  - --ls-h2
  - --ls-h3
demos:
  - TypographyScale
tags:
  - base
  - typography
---

Graffiti type uses a fluid scale controlled by `--fl` and semantic heading classes.

- Use native `h1`-`h6` for document structure.
- Use `.h1`-`.h6` when non-heading elements need heading styling.
- Use `.fs-*` classes for size-only adjustments without changing semantic elements.
- Use `.fc` when typography should respond to container width.

Line-height tokens (`--lh-xs` through `--lh-xl`) are available for tighter or looser rhythm control.

## Heading Letter Spacing

`h1`/`h2`/`h3` apply a subtle negative letter-spacing for tight display type. The values are exposed as tokens so serif or display-font themes can override them without fighting selector specificity:

```css
:root {
  --ls-h1: -0.02em;
  --ls-h2: -0.015em;
  --ls-h3: -0.01em;
}
```

Set these to `0` (or positive em values) for serif and slab faces that don't need tightening.
