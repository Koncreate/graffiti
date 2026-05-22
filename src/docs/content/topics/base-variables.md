---
id: variables
title: CSS Variables
route: base
order: 110
summary: Core spacing, radius, border, padding, line-height, shadow, motion, z-index, focus, and weight tokens.
when_to_use: Theme-safe design tokens for consistent spacing, shape, elevation, and motion.
classes:
  - --vs-*
  - --pad-*
  - --br-*
  - --border-*
  - --shadow-*
  - --d-*
  - --ease-*
  - --z-*
  - --fw-*
  - --focus-ring
demos:
  - SpacingScale
  - BorderRadiusScale
  - BorderScale
  - PaddingScale
  - LineHeightScale
  - ShadowScale
tags:
  - base
  - tokens
---

These tokens define the core spacing, surface, motion, and stacking system used by components and utilities.

- **Spacing**: `--vs-*` for vertical rhythm and `--pad-*` for interior padding (both scale `xs` through `xxxl`).
- **Shape**: `--br-*` for corner radii (`xs` through `xxl`) and `--border-*` for border styles (`--border-05`, `--border-1`…`--border-5`).
- **Type rhythm**: `--lh-*` for line-height adjustments — see Typography for the full set.
- **Elevation**: `--shadow-*` (`--shadow-1` through `--shadow-6`) for the depth ramp. `--box` is a separate inset highlight token (outer drop + two inset white highlights) used by `.box.glow`; it is not part of the elevation ramp.
- **Motion durations**: `--d-instant`, `--d-fast`, `--d-base`, `--d-slow`, `--d-emphatic` — the semantic motion scale (see ADR-0008).
- **Motion easings**: `--ease-smooth`, `--ease-bounce`, `--ease-emphasized`.
- **Stacking tiers**: `--z-base`, `--z-raised`, `--z-overlay`, `--z-sticky`, `--z-modal`, `--z-toast` — use these instead of raw integers.
- **Focus ring**: `--focus-ring`, `--focus-ring-offset`, `--focus-ring-offset-inset` for consistent keyboard focus styling.
- **Font weights**: `--fw-medium`, `--fw-semibold`, `--fw-bold` for portable weight references.

Use tokens first, then compose utilities/components on top to keep custom themes consistent.
