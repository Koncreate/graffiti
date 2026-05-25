---
id: log-card
title: Log Card
route: elements
order: 270
summary: Compact card with mono label, status slot, and optional pre body — for tool calls, deploy logs, build steps.
when_to_use: AI tool calls, deploy / CI logs, build steps, activity feeds — any single-row transcript line that may expand to show payload.
classes:
  - .log-card
  - .log-card > header
  - .log-card > header > .label
  - .log-card > header > .status
  - .log-card > pre
demos:
  - LogCard
tags:
  - elements
  - status
  - chat
---

`.log-card` is a compact card with a mono label header, a status slot,
and an optional `<pre>` body. Reads as a single row that may expand.
General-purpose transcript line — not chat-specific.

## Basic Usage

```html
<div class="log-card">
  <header>
    <svg>…</svg>
    <span class="label">query.warehouse</span>
    <span class="status">✓ 412ms</span>
  </header>
  <pre>select cohort_month, retained_30d
from analytics.user_retention</pre>
</div>
```

## Anatomy

- `> header` — mono label row with an icon, a `.label` (monospace), and an
  optional `.status` pushed to the trailing end. Status is meant for short
  affordances like `✓ 412ms`, `… running`, `× failed`.
- `> pre` — optional payload. Wraps at the card edge; readable but contained.
- Any other body content (paragraphs, summaries) also works — `<pre>` is just
  the most common.

## Composition

Sits inside a `.chat-message` for AI tool calls, or anywhere a
single-row-with-payload affordance is needed:

```html
<article class="chat-message stack">
  <p class="text-faint fs-xs"><strong>Atlas</strong> · using tools</p>
  <div class="log-card">…</div>
  <div class="log-card">…</div>
</article>
```
