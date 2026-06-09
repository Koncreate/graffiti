---
id: rating
title: Rating
route: elements
order: 215
summary: Five-star rating in two zero-JS forms — a read-only display meter and a native-radio input.
when_to_use: Showing an average score or collecting a star rating without JavaScript.
classes:
  - .rating
demos:
  - Rating
tags:
  - elements
  - forms
  - status
---

`.rating` ships two forms that share the same star visuals. Pick by whether the
value is read-only or editable. Both work with native HTML + CSS only and need
no JavaScript.

## Display Form (Read-Only)

Put a `--rating` value (0–5, decimals allowed) on a `<span class="rating">`. The
filled portion is clipped to `--rating / 5`, so half- and quarter-stars render
faithfully. Because the stars are decorative paint, give the element an
accessible name with `role="img"` + `aria-label` so the score is announced.

```html
<span class="rating" style="--rating: 5" role="img" aria-label="Rated 5 out of 5"></span>
<span class="rating" style="--rating: 3.5" role="img" aria-label="Rated 3.5 out of 5"></span>
<span class="rating" style="--rating: 0" role="img" aria-label="Not yet rated"></span>
```

- Filled stars use `--warning` (the semantic amber token); the empty track uses
  `--fg-2`. Override `--rating-on` / `--rating-off` to retint.
- Adjust scale with `--rating-size` (defaults to `1.25em`).

## Input Form (Interactive)

Wrap five `radio` + `label` pairs in a `<fieldset class="rating">`. List them in
**reverse order** (5 down to 1) so the general-sibling combinator can fill the
checked star and every star before it. It collects a real form value, supports
keyboard selection, shows a hover preview, and degrades to plain native radio
buttons if the styling is unavailable.

```html
<fieldset class="rating">
  <legend class="visually-hidden">Rate this item</legend>
  <input type="radio" id="r5" name="rate" value="5" />
  <label for="r5" aria-label="5 stars"></label>
  <input type="radio" id="r4" name="rate" value="4" />
  <label for="r4" aria-label="4 stars"></label>
  <input type="radio" id="r3" name="rate" value="3" />
  <label for="r3" aria-label="3 stars"></label>
  <input type="radio" id="r2" name="rate" value="2" />
  <label for="r2" aria-label="2 stars"></label>
  <input type="radio" id="r1" name="rate" value="1" />
  <label for="r1" aria-label="1 star"></label>
</fieldset>
```

- Each `<label>` carries an `aria-label` ("3 stars") so the choice is announced.
- The radios stay focusable (visually hidden, not `display: none`); the active
  label gets the standard focus ring on `:focus-visible`.
- Hover preview and the checked transition are short-circuited automatically
  under `prefers-reduced-motion` via the global motion guard.

## Accessibility Notes

- Display form: `role="img"` + `aria-label` is the single source of truth for the
  value — keep the label in sync with `--rating`.
- Input form: the `fieldset` + `legend` group the radios; submit the chosen
  `value` like any other radio group.
