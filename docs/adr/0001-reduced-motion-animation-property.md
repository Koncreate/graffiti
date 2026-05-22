# Reduced motion via `@property --animation-reduced`, not a global override

When the user prefers reduced motion, Graffiti opts each animated component into a *specific* reduced variant via an unregistered `--animation-reduced` custom property, instead of globally flattening `animation-duration` and `transition-duration` on `*, *::before, *::after`.

The earlier global pattern caused two concrete failures: looping animations (spinners, progress) snapped to their end frame and looked broken instead of paused, and `transition: display 0.2s allow-discrete` collapsed into a near-zero discrete transition that flickered for popovers, dialogs, and drawers (used in 5+ places in `drop-in.css`). The Google "Modern Web Guidance" CSS guide explicitly warns against the global `0.01ms` pattern for exactly these reasons.

## Pattern

```css
@property --animation-reduced {
  syntax: "*";
  inherits: false;
  initial-value: none;
}

@media (prefers-reduced-motion: reduce) {
  * { animation: var(--animation-reduced) !important; }
}
```

Animated components declare a reduced variant where appropriate:

```css
.progress-indeterminate {
  animation: slide 1s infinite linear;
  --animation-reduced: slide 20s infinite linear;
}
```

Components without a declared `--animation-reduced` stop entirely under reduced motion — which is the correct default for incidental motion (hover transitions, transform-based reveals).

## Consequences

Every animated primitive in `@layer components` (`button`, `.card.linked`, `.feature-card`, dialog, drawer, accordion, toast) needs a deliberate `--animation-reduced` value or an intentional decision to fully stop. New animated components MUST consider their reduced-motion contract — there is no global fallback.
