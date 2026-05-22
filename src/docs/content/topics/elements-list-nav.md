---
id: list-nav
title: List Navigation
route: elements
order: 330
summary: Navigation list with clickable rows for settings pages, menus, and navigation indexes.
when_to_use: Grouped list-style navigation rows.
classes:
  - .list-nav
demos:
  - ListNav
tags:
  - elements
  - navigation
---

Each item is a pill-shaped card with subtle shadow.

## Use Cases

- Settings pages
- Mobile app menus
- Feature indexes
- Dashboard navigation
- Account/profile menus

## Basic Structure

```html
<nav class="list-nav">
  <a href="/profile">
    <svg>...</svg>
    Profile
    <small>Manage your account settings</small>
  </a>

  <a href="/notifications">
    <svg>...</svg>
    Notifications
    <small>Configure alerts and updates</small>
  </a>
</nav>
```

## Item Structure

Items are direct `<a>` or `<button>` children of `.list-nav`. No additional classes needed.

Each item can contain:

1. **`<svg>`** - Icon on the left (sized to 1.25em)
2. **Text** - Title text
3. **`<small>`** - Optional description (muted, smaller text)

## Styling

Each item automatically gets:

- **Pill radius** - `var(--br-xxl)` rounded corners
- **Subtle shadow** - `var(--shadow-2)` for elevated card appearance
- **Background** - Uses `var(--bg)` for proper theming
- **Gap** - `var(--pad-m)` spacing between items
- **Dark mode** - Items pick up a `var(--border-1)` border for definition

## With Button Elements

```html
<nav class="list-nav">
  <button onclick="openSettings()">
    <svg>...</svg>
    Open Settings
    <small>Configure your preferences</small>
  </button>
</nav>
```

## Disabled State

```html
<nav class="list-nav">
  <button disabled>
    <svg>...</svg>
    Advanced Settings
    <small>Coming soon</small>
  </button>
</nav>
```

## States

- **Default**: Pill-shaped card with subtle shadow
- **Hover**: Background highlight, icon brightens
- **Focus**: Focus ring with inset offset
- **Active**: Slightly darker background
- **Disabled**: 65% opacity, no pointer events

## Differences from Sidebar Nav

| Feature       | List Nav                     | Sidebar Nav              |
| ------------- | ---------------------------- | ------------------------ |
| Item style    | Individual cards with shadow | Flat items in a list     |
| Description   | Supported via `<small>`      | Not supported            |
| Use case      | Standalone navigation rows   | Sticky sidebar menus     |
| Nesting       | Not supported                | Supports details/summary |
| Visual weight | Higher (cards with shadow)   | Lower (compact)          |

## Accessibility

- Use semantic `<nav>` container
- Use `<a>` for navigation links, `<button>` for actions
- Disabled buttons use `disabled` attribute
- Links can use `aria-disabled="true"` when needed
- Focus states are clearly visible
