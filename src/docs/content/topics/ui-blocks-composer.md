---
id: composer
title: Composer
route: ui-blocks
order: 230
summary: Multi-line input with an inline toolbar — model, tool, attach controls alongside the text.
when_to_use: AI chat surfaces, comment and post composers, email drafts — anywhere a textarea has adjacent affordances. Use plain `.chat-composer` when only a single input + send button is needed.
classes:
  - .composer
  - .composer > textarea
  - .toolbar
  - .toolbar > .spacer
demos:
  - Composer
tags:
  - ui-blocks
  - forms
  - chat
---

`.composer` is a multi-line input with an inline toolbar. It supersedes
[`.chat-composer`](/elements#bubble) when you need model, tool, or attach
controls next to the text input. Also useful for comment and post surfaces —
anywhere a textarea has adjacent affordances.

## Basic Usage

```html
<form class="composer">
  <textarea name="message" rows="2" placeholder="Ask Atlas anything…"></textarea>
  <div class="toolbar">
    <button type="button" class="minimal" aria-label="Attach">📎</button>
    <span class="chip">web</span>
    <span class="chip">warehouse</span>
    <div class="spacer"></div>
    <button class="primary" type="submit">Send</button>
  </div>
</form>
```

## Anatomy

- `.composer` — column container. Border, `--br-l` radius, `--shadow-2` lift.
- `:focus-within` — border switches to `--primary`, adds a brand-tinted ring.
  Pure CSS, no JS.
- `> textarea`, `> input[type="text"]` — borderless inputs that inherit the
  composer's surface. `resize: none`; size with `rows`.
- `.toolbar` — the public [`.toolbar`](/elements#toolbar) control row, consumed
  directly. Children are typically icon buttons, chips, or a `.spacer` to push
  the submit to the trailing end; the composer adds only its own inline padding.
- `.toolbar > .spacer` — `flex: 1` push-to-end helper.

## Mobile Behavior

Inside `.layout-rail`, the toolbar wraps automatically at narrow container
widths (`<768px`). Use the existing `.chip` density rather than introducing
new mobile-specific classes.
