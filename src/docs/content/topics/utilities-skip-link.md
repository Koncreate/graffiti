---
id: skip-link
title: Skip Link
route: utilities
order: 305
summary: Bypass-navigation link that stays hidden until focused, then reveals as a pinned pill.
when_to_use: Let keyboard and screen-reader users jump straight to the main content past repeated navigation.
classes:
  - .skip-link
demos:
  - SkipLink
tags:
  - utilities
  - accessibility
---

A skip link is the first focusable element on the page. It is screen-reader-only by default and reveals visually only when it receives keyboard focus, so it never disrupts the visual design while still satisfying WCAG bypass-blocks guidance.

- Place `<a class="skip-link" href="#main">` as the very first element inside `<body>`, before the header and navigation.
- Point `href` at the `id` of the main landmark (for example `<main id="main">`).
- It works with native HTML and CSS only: no JavaScript, and it degrades to a normal anchor if styling fails to load.
- On focus it pins to the top inline-start corner with the standard focus ring; off focus it slides back out of view.
