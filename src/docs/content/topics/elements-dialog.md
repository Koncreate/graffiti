---
id: dialog
title: Dialog
route: elements
order: 300
summary: Native HTML `<dialog>` element with open/close animations.
when_to_use: Native modal flows and confirmations.
classes:
  - dialog
  - .close
demos:
  - Dialog
tags:
  - elements
  - modal
---

No JavaScript required when using HTML invokers.

## Basic Example

```html
<button commandfor="my-dialog" command="show-modal">Open Dialog</button>

<dialog id="my-dialog">
  <button class="close" commandfor="my-dialog" command="close">×</button>
  <p>You can put anything in a dialog.</p>
</dialog>
```

## How It Works

- `commandfor` points to the dialog's `id`
- `command="show-modal"` opens the dialog as a modal
- `command="close"` closes the dialog
- No JavaScript needed for basic open/close

## Close Button

The `.close` class creates a circular red button. When it is a direct child of a `<dialog>`, an extra rule pins it to the top-right corner (slightly overlapping the dialog's top edge). Used outside a `<dialog>`, it's just the circular button — position it yourself.

```html
<button class="close">×</button>
```

## Styling Details

- `max-width: 40ch` - Character-based width for good proportions
- Dark backdrop overlay
- Smooth scale/opacity animation on open/close
- Works in light and dark themes automatically
