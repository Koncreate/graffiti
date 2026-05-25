---
id: bubble
title: Bubble
route: elements
order: 260
summary: Chat-friendly message container with configurable colors, width, and spacing.
when_to_use: Chat message presentation and conversation snippets.
classes:
  - .bubble
  - .bubble.thinking
  - .bubble.streaming
  - .chat-thread
  - .chat-thread.flowing
  - .chat-row
  - .chat-row.self
  - .chat-message
  - .chat-composer
demos:
  - Bubble
tags:
  - elements
  - chat
---

`.bubble` is a rounded chat container with configurable padding, max-width, and child flow spacing.

## Basic Usage

```html
<article class="bubble">Assistant message with default bubble tokens.</article>
```

## Sender Variants with CSS Variables

```html
<article class="bubble">Assistant response bubble.</article>

<article
  class="bubble"
  style="--bubble-bg: var(--primary-1); --bubble-border: var(--primary-5);"
>
  User message bubble.
</article>
```

## Multi-Element Content

```html
<article class="bubble">
  <h5>Deployment status</h5>
  <p>Build finished in 43s and staging is ready for QA.</p>
</article>
```

## Chat Layout Helpers

Use these helpers to build complete chat threads:

- `.chat-thread` - Vertical message stack with configurable spacing/padding
- `.chat-row` - Left-aligned row
- `.chat-row.self` - Right-aligned row
- `.chat-message` - Width-constrained wrapper for each message
- `.chat-composer` - Composer row where `.input-group` expands to fill space

```html
<section class="chat-thread">
  <div class="chat-row">
    <article class="chat-message bubble">Assistant message</article>
  </div>

  <div class="chat-row self">
    <article
      class="chat-message bubble"
      style="--bubble-bg: var(--primary-1); --bubble-border: var(--primary-5);"
    >
      User message
    </article>
  </div>
</section>

<footer class="chat-composer">
  <button class="circle" type="button">+</button>
  <div class="input-group">
    <input type="text" placeholder="Message..." />
    <button class="primary" type="button">Send</button>
  </div>
</footer>
```

## In-Flight Variants

Two state modifiers for assistant turns:

```html
<article class="bubble thinking">Thinking about how to phrase the answer…</article>

<article class="bubble streaming">
  Charting cohort retention by month, indexed to the Jul launch
</article>
```

- `.bubble.thinking` — dashed border, italic, muted color. For reasoning / system thought.
- `.bubble.streaming` — appends a blinking caret cursor. Pure CSS (`@keyframes`).

## Flowing Thread (Bubble-less)

For long-form / editorial agents the conversation can read as one document
rather than a stack of bubbles. Each turn becomes a row in a single
readable column:

```html
<section class="chat-thread flowing">
  <div class="turn">
    <p class="who">You</p>
    <div class="body">
      <p>Summarize the changelog since Q3.</p>
    </div>
  </div>
  <div class="turn">
    <p class="who">Atlas</p>
    <div class="body">
      <p>Two themes line up: paywall timing and onboarding cuts.</p>
      <p>The Aug 02 change is the larger contributor (≈4.1 pp).</p>
    </div>
  </div>
</section>
```

## CSS Variables

- `--bubble-bg` - Bubble background color
- `--bubble-border` - Bubble border color
- `--bubble-max-inline` - Max bubble width
- `--bubble-pad-block` - Block-axis padding
- `--bubble-pad-inline` - Inline-axis padding
- `--bubble-radius` - Corner radius
- `--bubble-flow-space` - Spacing between child elements
