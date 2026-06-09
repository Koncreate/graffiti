---
id: highlight
title: Highlighted Text
route: base
order: 115
summary: Native mark element themed with the highlighter color scale.
when_to_use: Calling out matched search terms or emphasized phrases within running text.
classes:
  - mark
demos:
  - Mark
tags:
  - base
  - typography
---

Native `<mark>` elements are themed by default using the translucent highlighter scale.

- Use `<mark>` for semantic highlighting (search-result matches, emphasized phrases), not as a general styling hook.
- The tint is translucent and `color` is inherited, so highlights stay legible in both light and dark themes.
- Forced-colors mode falls back to the system `Mark` / `MarkText` colors automatically.
- Override the tint at the token boundary by reassigning the `--highlighter` scale rather than restyling `mark` directly.
