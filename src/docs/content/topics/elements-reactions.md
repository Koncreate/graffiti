---
id: reactions
title: Reactions
route: elements
order: 218
summary: Emoji reaction picker on a native select, degrades to a normal dropdown.
when_to_use: Letting people react to a post, comment, or message with a single emoji.
classes:
  - .reactions
demos:
  - Reactions
tags:
  - elements
  - forms
  - actions
---

`.reactions` turns a native `<select>` into a horizontal emoji reaction bar
using the **customizable select** API (`appearance: base-select`). The whole
control is one class on the `<select>` — the trigger shows the current
reaction, and opening it reveals the bar of emoji options. No JavaScript.

```html
<select class="reactions" aria-label="React" name="reaction">
  <button><selectedcontent></selectedcontent></button>
  <option value="like" selected>👍<span class="visually-hidden"> Like</span></option>
  <option value="love">❤️<span class="visually-hidden"> Love</span></option>
  <option value="haha">😂<span class="visually-hidden"> Haha</span></option>
  <option value="wow">😮<span class="visually-hidden"> Wow</span></option>
  <option value="sad">😢<span class="visually-hidden"> Sad</span></option>
  <option value="angry">😡<span class="visually-hidden"> Angry</span></option>
</select>
```

## Anatomy

Three pieces of native markup make the customizable select work — none of them
are extra Graffiti classes:

- `<button><selectedcontent></selectedcontent></button>` — the trigger. The
  `<selectedcontent>` mirrors the chosen `<option>`, so the trigger always
  shows the current reaction.
- `<option>` — one per reaction. The emoji is the visible glyph; a trailing
  `.visually-hidden` text label ("Like", "Love", …) gives each option a real
  accessible name so it isn't announced as "thumbs-up sign".
- `class="reactions"` on the `<select>` — the only Graffiti class involved.

## Behaviour & fallback

Because it's a real `<select>`, you get keyboard navigation, focus management,
and a submittable form value for free. The chosen reaction posts under the
control's `name`.

Where customizable select isn't supported, the `<button>` /
`<selectedcontent>` children are ignored and the element renders as an ordinary
`<select>` dropdown of the same emoji options — a fully working, accessible
fallback with no JavaScript shim.

## Accessibility

- Always give the `<select>` an `aria-label` (or an associated `<label>`) — the
  reactions themselves are emoji, so the control needs its own name.
- Keep a `.visually-hidden` text label inside every `<option>` so each reaction
  is announced by name in both the styled bar and the native fallback.
- The trigger and options take the standard focus ring on `:focus-visible`; the
  open/close entrance is short-circuited under `prefers-reduced-motion` by the
  global motion guard.

## Tuning

- `--reaction-size` (default `1.35rem`) sets the trigger glyph size; the picker
  scales its option emoji off the same value.
- The bar opens centred above the trigger (`position-area: block-start` +
  `justify-self: anchor-center`) and flips below via
  `position-try-fallbacks: flip-block` when there isn't room.
