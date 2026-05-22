# Cascade layer order: layouts are highest, not utilities

Graffiti declares cascade layers in the order `@layer base, components, utilities, layouts;` — layout primitives win over utility classes applied within them.

This inverts the Tailwind-style convention of `base, components, utilities` (utilities highest). The reason is structural: Graffiti's layout primitives (`.layout-sidebar`, `.layout-card`, `.layout-readable`, etc.) are outermost frames whose responsive behavior must not be defeated by atomic utility classes applied to their children. A `.layout-sidebar` that hides its sidebar child at `width < 768px` was previously broken when the child carried `.split` or `.flex`, because the utility layer's `display: flex` declaration beat the layout layer's `display: none` — forcing two `!important` declarations and a multi-line justification comment to make it work.

## Considered options

- `@layer base, components, layouts, utilities;` (Tailwind-style) — required `!important` to make layout responsive behavior win. Rejected.
- A new top `responsive` layer — yet another layer to remember, and the split between "layout-driven responsiveness" and "responsive utility" is fuzzy. Rejected.
- `@scope` for the sidebar rule — Firefox shipped support only recently; avoided for browser-support breadth. May revisit.
- Status quo with `!important` — works, but the long justification comment was itself a signal that the layer order was wrong.

## Consequences

Authors who want to override a layout property at a specific breakpoint via a utility must do so with a layer declaration, since utilities are now a lower layer than layouts. This is a deliberate trade: layout primitives are the framework's structural contract; utilities are atomic helpers that should not silently break that contract.
