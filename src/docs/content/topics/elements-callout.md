---
id: callout
title: Callouts
route: elements
order: 240
summary: Informational boxes for tips, warnings, errors, and success messages.
when_to_use: Inline informational or status callout blocks.
classes:
  - .callout
  - .warning
  - .error
  - .success
  - .ghost
  - .fill
  - .callout.stack
demos:
  - Callout
tags:
  - elements
  - status
---

## Variants

```html
<div class="callout">Default callout for general information.</div>
<div class="callout warning">Warning callout for important notices.</div>
<div class="callout error">Error callout for critical issues.</div>
<div class="callout success">Success callout for confirmations.</div>
<div class="callout ghost">Ghost callout for subtle messages.</div>
```

## With Icon

The first direct `<svg>` child is pulled into the gutter and colored with
`--callout-accent`:

```html
<div class="callout warning">
  <svg aria-hidden="true">…</svg>
  <p>This action cannot be undone.</p>
</div>
```

## With Button

```html
<div class="callout">
  <p>Your trial expires in 3 days.</p>
  <button>Upgrade Now</button>
</div>
```

## Fill Variant

Add `.fill` for a soft tinted surface (no border):

```html
<div class="callout fill">Filled info callout.</div>
<div class="callout warning fill">Filled warning callout.</div>
```

## Multiple Elements

Add `.stack` directly to the callout to align children to the start and stack them with consistent spacing:

```html
<div class="callout stack">
  <h4>Multiple Elements</h4>
  <p>First paragraph of content.</p>
  <p>Second paragraph of content.</p>
  <button>Action</button>
</div>
```

A nested `<div class="stack">` works too if you need finer control over which children stack.

## CSS Variables

- `--callout-tint` - Background color (applies to `.fill` only)
- `--callout-accent` - Icon color
