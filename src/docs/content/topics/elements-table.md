---
id: table
title: Tables
route: elements
order: 290
summary: Responsive table wrapper with clean data table styling.
when_to_use: Responsive table wrapper and default table styling.
classes:
  - .table
  - .table.zebra
  - .table.sticky
demos:
  - Table
  - TableSticky
tags:
  - elements
  - data
---

## Basic Example

```html
<div class="table">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Jane Doe</td>
        <td>jane@example.com</td>
        <td>Admin</td>
      </tr>
      <tr>
        <td>John Smith</td>
        <td>john@example.com</td>
        <td>User</td>
      </tr>
    </tbody>
  </table>
</div>
```

## Zebra Striping

Add `.zebra` to the wrapper for alternating row backgrounds (`var(--fg-05)` on even rows):

```html
<div class="table zebra">
  <table>
    <!-- … -->
  </table>
</div>
```

## Sticky Header

Add `.sticky` to the wrapper to pin the header row while the body scrolls vertically. The wrapper becomes a vertical scroll context capped by `--table-max-height` (defaults to `70vh`), and each `<th>` uses `position: sticky` so it stays visible on top of the scrolling cells:

```html
<div class="table sticky" style="--table-max-height: 24rem">
  <table>
    <thead>
      <tr>
        <th>Project</th>
        <th>Owner</th>
      </tr>
    </thead>
    <tbody>
      <!-- many rows … -->
    </tbody>
  </table>
</div>
```

- Pure CSS, zero JavaScript — `position: sticky` does all the work.
- The header `<th>` cells get an opaque `var(--bg)` so scrolling rows do not show through.
- `.sticky` composes with `.zebra` on the same wrapper.
- Override the scroll height with `--table-max-height` (e.g. `--table-max-height: 24rem`).

A future enhancement could add a scroll-shadow under the header that appears only while the body is scrolled, using scroll-state container queries (`@container scroll-state(scrollable: top)`); it is deferred until that feature has broad browser support.

## Why the Wrapper?

The `.table` wrapper provides:

- Horizontal scrolling on small screens
- Border and border-radius on the container
- Proper overflow handling

## Styling Details

- Tables are 100% width with collapsed borders
- Headers have bottom border separator
- Cells have consistent padding
- Last row has no bottom border
- Wrapper has `overflow-x: auto` for responsiveness

## CSS Variables

- `--table-border` - Custom border-radius for wrapper

## Without Wrapper

Basic table styling also works without the wrapper, but you lose the responsive overflow and container styling:

```html
<table>
  <thead>
    <tr>
      <th>Header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data</td>
    </tr>
  </tbody>
</table>
```
