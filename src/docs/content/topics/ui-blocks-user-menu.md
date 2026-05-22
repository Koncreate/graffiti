---
id: user-menu
title: User Menu
route: ui-blocks
order: 190
summary: User account dropdown combining avatar trigger with dropdown menu.
when_to_use: Avatar trigger plus account actions dropdown.
classes:
  - .avatar
  - .dropdown
demos:
  - UserMenu
tags:
  - ui-blocks
  - navigation
---

Works with both image and initials avatars. Set a unique `--anchor` on each dropdown so the menu attaches to its avatar trigger.

## Example with Image

```html
<div class="dropdown end" style="--anchor: --user-menu-jane">
  <button popovertarget="user-menu" class="avatar">
    <img src="/avatar.jpg" alt="Jane Doe" />
  </button>
  <div id="user-menu" popover class="dropdown-menu">
    <div class="dropdown-header">Jane Doe</div>
    <a href="/profile">Profile</a>
    <a href="/settings">Settings</a>
    <hr />
    <button>Sign Out</button>
  </div>
</div>
```

## Example with Initials

```html
<div class="dropdown end" style="--anchor: --user-menu-jd">
  <button popovertarget="user-menu" class="avatar">JD</button>
  <div id="user-menu" popover class="dropdown-menu">
    <div class="dropdown-header">Jane Doe</div>
    <a href="/profile">Profile</a>
    <a href="/settings">Settings</a>
    <hr />
    <button>Sign Out</button>
  </div>
</div>
```

## Key Classes

- `.dropdown.end` - Aligns menu to right edge of avatar
- `.avatar` - Circular avatar styling on the button
- `.avatar.bordered` - Adds a subtle border around the avatar
- `.dropdown-menu` - Menu styling
- `.dropdown-header` - User name display in menu

## Anchor Setup

`.dropdown` requires a `--anchor` inline style (dashed-ident, unique per instance) so the menu can position-anchor to its trigger. See the [Dropdown topic](#dropdown) for details.

## Avatar Sizes

```html
<button popovertarget="menu" class="avatar xs">JD</button>
<!-- 1.5rem -->
<button popovertarget="menu" class="avatar s">JD</button>
<!-- 2rem -->
<button popovertarget="menu" class="avatar">JD</button>
<!-- 2.5rem (default) -->
<button popovertarget="menu" class="avatar l">JD</button>
<!-- 3.5rem -->
<button popovertarget="menu" class="avatar xl">JD</button>
<!-- 5rem -->
```
