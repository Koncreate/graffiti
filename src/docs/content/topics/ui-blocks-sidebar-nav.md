---
id: sidebar-nav
title: Sidebar Navigation
route: ui-blocks
order: 140
summary: Vertical navigation for app sidebars with collapsible sections.
when_to_use: Sectioned app navigation with collapsible groups.
classes:
  - .sidebar-nav
  - .sidebar-nav.compact
  - .sidebar-nav.ghost
  - .sidebar-nav.minimal
  - .sidebar-nav.strong-active
  - .sub
tokens:
  - --sn-color
demos:
  - SidebarNav
tags:
  - ui-blocks
  - navigation
---

Uses native `<details>`/`<summary>` for expand/collapse.

## Example

```html
<nav class="sidebar-nav">
  <a href="/inbox">Inbox</a>
  <a href="/issues" aria-current="page">Issues</a>

  <details open>
    <summary>Cycles</summary>
    <a href="/current">Current</a>
    <a href="/upcoming">Upcoming</a>
    <a href="/past">Past</a>
  </details>

  <details>
    <summary>Projects</summary>
    <a href="/web">Web App</a>
    <a href="/mobile">Mobile</a>
  </details>

  <a href="/views">Views</a>
  <a href="/settings">Settings</a>
</nav>
```

## Active State

Mark the current page with `aria-current="page"`:

```html
<a href="/issues" aria-current="page">Issues</a>
```

Or use `.active` class on nested links:

```html
<details open>
  <summary>Cycles</summary>
  <a href="/current" class="active">Current</a>
</details>
```

## Sub-Items Without Collapsible Wrapper

Use `.sub` class for indented top-level links:

```html
<nav class="sidebar-nav">
  <a href="/all">All Issues</a>
  <a href="/my-issues" class="sub">My Issues</a>
  <a href="/backlog" class="sub">Backlog</a>
</nav>
```

## With Icons

```html
<nav class="sidebar-nav">
  <a href="/inbox">
    <svg><!-- inbox icon --></svg>
    Inbox
  </a>
  <a href="/issues">
    <svg><!-- issues icon --></svg>
    Issues
  </a>
</nav>
```

Icons are automatically sized to `20px` (customizable via `--sidebar-nav-icon-size`).

## CSS Variables

- `--sidebar-nav-icon-size` - Icon size (default: 20px)
- `--sidebar-nav-indent` - Indentation for nested items (default: 1.5rem)

## Variants

### Compact

Use `.compact` when a sidebar needs denser rows:

```html
<nav class="sidebar-nav compact">
  <a href="/inbox" aria-current="page">Inbox</a>
  <a href="/assigned">Assigned</a>
  <a href="/done">Done</a>
</nav>
```

Compact mode keeps focus and hover behavior, while reducing row padding and icon size.

### Ghost

`.ghost` swaps the row gradient for a transparent fill with a thin border that strengthens on hover and active. Use it when the sidebar should read as part of a surrounding panel rather than a filled control.

```html
<nav class="sidebar-nav ghost">
  <a href="/design">Design</a>
  <a href="/engineering" aria-current="page">Engineering</a>
  <a href="/support">Support</a>
</nav>
```

### Minimal

`.minimal` drops the row chrome entirely — no border, no background, no shadow. Rows are text only; hierarchy comes from color. Inactive text sits at `--fg-8`; the active row brightens to full `--fg`.

```html
<nav class="sidebar-nav minimal">
  <a href="/home">Home</a>
  <a href="/library" aria-current="page">Library</a>
  <a href="/archive">Archive</a>
</nav>
```

### Strong active

Compose `.strong-active` with `.minimal` or `.ghost` when the default active brightness isn't pulling enough hierarchy. The active row paints in full `--fg` and the hover state matches, so the selected row is clearly the brightest thing in the list.

```html
<nav class="sidebar-nav minimal strong-active">
  <a href="/home">Home</a>
  <a href="/library" aria-current="page">Library</a>
  <a href="/archive">Archive</a>
</nav>
```

### Primary-colored active row

Set `--sn-color` on the nav to opt the active row's gradient + text into a theme color. Pairs cleanly with `var(--primary)` so the highlight re-skins with the rest of the theme.

```html
<nav class="sidebar-nav" style="--sn-color: var(--primary);">
  <a href="/dashboard" aria-current="page">Dashboard</a>
  <a href="/analytics">Analytics</a>
  <a href="/billing">Billing</a>
</nav>
```

`--sn-color` can also point at `var(--success)`, `var(--warning)`, `var(--error)`, or any color you've put in scope.

## App Shell Pattern (Dashboard / Settings)

Combine with `.layout-sidebar.fill` for the canonical shell:

```html
<div class="layout-sidebar fill">
  <aside>
    <nav class="sidebar-nav">
      <a href="/overview" aria-current="page">Overview</a>
      <a href="/settings">Settings</a>
    </nav>
  </aside>
  <div class="app-shell">
    <header>Workspace</header>
    <main>Scrollable page content</main>
    <footer>Footer actions</footer>
  </div>
</div>
```

Notes:

- `.layout-sidebar.fill` is app-shell-oriented by default (`--layout-gap: 0`, `height: 100dvh`)
- Fill children auto-scroll when they are not `.app-shell`
- If a fill child is `.app-shell`, overflow is not forced there, avoiding double-scroll

## Fixed Sidebar Pattern

```html
<div class="layout-sidebar fixed">
  <aside>
    <nav class="sidebar-nav">
      <a href="/docs" aria-current="page">Docs</a>
      <a href="/api">API</a>
    </nav>
  </aside>
  <main>
    <article>Long docs content</article>
  </main>
</div>
```

Use this when navigation should remain visible while main content scrolls.
