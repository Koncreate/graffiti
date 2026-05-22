---
id: dropdown
title: Dropdown Menu
route: ui-blocks
order: 130
summary: Native dropdown menu using HTML popover API and CSS anchor positioning.
when_to_use: Action menus using popover and anchor positioning.
classes:
  - .dropdown
  - .dropdown-menu
  - .dropdown-header
  - .end
demos:
  - Dropdown
tags:
  - ui-blocks
  - navigation
---

No JavaScript required for open/close.

## Anchor Setup (Required)

Each dropdown needs a unique `--anchor` value set on `.dropdown`. The menu uses CSS anchor positioning to attach to its trigger, and `--anchor` is the dashed-ident that ties them together. Without it, the popover falls back to default centered placement.

```html
<div class="dropdown" style="--anchor: --my-menu">
  <!-- trigger + menu -->
</div>
```

The value must start with `--` and be unique per dropdown on the page.

## Basic Example

```html
<div class="dropdown" style="--anchor: --menu-options">
  <button popovertarget="menu-id">Options</button>
  <div id="menu-id" popover class="dropdown-menu">
    <a href="/profile">Profile</a>
    <a href="/settings">Settings</a>
    <hr />
    <button>Sign Out</button>
  </div>
</div>
```

## How It Works

- `--anchor` on `.dropdown` declares the anchor name; the menu reads it as `position-anchor`
- `popovertarget` on the button points to the menu's `id`
- `popover` attribute enables native popover behavior
- `.dropdown-menu` provides styling and positioning
- Clicking outside automatically closes the menu

## With Section Headers

```html
<div class="dropdown" style="--anchor: --menu-actions">
  <button popovertarget="actions-menu">Actions</button>
  <div id="actions-menu" popover class="dropdown-menu">
    <div class="dropdown-header">Account</div>
    <a href="/profile">Profile</a>
    <a href="/settings">Settings</a>
    <hr />
    <div class="dropdown-header">Danger Zone</div>
    <button>Delete Account</button>
  </div>
</div>
```

## End-Aligned (Right)

Use `.end` to align menu to the right edge of the trigger:

```html
<div class="dropdown end" style="--anchor: --menu-end">
  <button popovertarget="menu">Options</button>
  <div id="menu" popover class="dropdown-menu">
    <!-- menu items -->
  </div>
</div>
```

## Disabled Items

```html
<a href="/edit" aria-disabled="true">Edit (disabled)</a>
<!-- or -->
<a href="/edit" class="disabled">Edit (disabled)</a>
```

## Menu Item Types

Links and buttons inside `.dropdown-menu` are automatically styled:

```html
<div class="dropdown-menu" popover>
  <a href="/page">Link item</a>
  <!-- navigates -->
  <button>Button item</button>
  <!-- triggers action -->
  <hr />
  <!-- divider -->
  <div class="dropdown-header">Section</div>
  <!-- section header -->
</div>
```
