<div class="stack">
  <p class="text-faint fs-xs">
    Multi-line input with an inline toolbar. Supersedes <code>.chat-composer</code>
    when you need model / tool / attach controls next to the text. Use the
    <code>.spacer</code> child to push the submit affordance to the trailing end.
  </p>

  <form class="composer" onsubmit={(event) => event.preventDefault()}>
    <textarea name="message" rows="2" placeholder="Ask Atlas anything about Q3…"></textarea>
    <div class="toolbar">
      <button type="button" class="minimal" style="padding: var(--pad-xs);" aria-label="Attach">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M21 12.5l-9 9a6 6 0 0 1-8.5-8.5l9-9a4 4 0 1 1 5.7 5.7L8.5 19.5" />
        </svg>
      </button>
      <button type="button" class="minimal" style="padding: var(--pad-xs);" aria-label="Mention">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.9 7.9" />
        </svg>
      </button>
      <span class="chip" style="font-size: 0.7rem;">web</span>
      <span class="chip" style="font-size: 0.7rem;">warehouse</span>
      <div class="spacer"></div>
      <span class="text-faint fs-xs">⌘↵</span>
      <button class="primary" type="submit">Send</button>
    </div>
  </form>
</div>
