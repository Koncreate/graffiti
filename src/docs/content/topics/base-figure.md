---
id: figure
title: Figures and captions
route: base
order: 120
summary: Native figure and figcaption elements themed for captioned media and quotes.
when_to_use: Pairing an image, chart, code sample, or quotation with a caption that describes or attributes it.
classes:
  - figure
  - figcaption
demos:
  - Figure
tags:
  - base
  - typography
  - media
---

Native `<figure>` and `<figcaption>` elements are themed by default, so captioned media reads consistently without extra classes.

- Wrap self-contained content (an image, chart, code block, or quotation) in `<figure>` and describe or attribute it with a single `<figcaption>`.
- The figure gets vertical rhythm via the `--vs-*` spacing scale; the caption renders one fluid step smaller (`--fl: -1`) in the muted `--fg-5` color.
- Keep the caption as the first or last child of the figure so the spacing reads correctly with the media.
- For edge-bleed media inside cards, place the `<figure>` in a `.card`, which provides its own figure treatment.
