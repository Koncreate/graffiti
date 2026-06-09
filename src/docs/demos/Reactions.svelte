<script>
  const picker = `
    <select class="reactions" aria-label="React to this post" name="reaction">
      <button><selectedcontent></selectedcontent></button>
      <option value="like" selected>👍<span class="visually-hidden"> Like</span></option>
      <option value="love">❤️<span class="visually-hidden"> Love</span></option>
      <option value="haha">😂<span class="visually-hidden"> Haha</span></option>
      <option value="wow">😮<span class="visually-hidden"> Wow</span></option>
      <option value="sad">😢<span class="visually-hidden"> Sad</span></option>
      <option value="angry">😡<span class="visually-hidden"> Angry</span></option>
    </select>`;
</script>

<div class="stack">
  <p class="text-faint fs-xs">
    Click the reaction to open the bar, then pick an emoji. It's a native
    <code>&lt;select&gt;</code> — keyboard-navigable, form-submittable, and it
    falls back to a normal dropdown where customizable select isn't supported.
  </p>

  {@html picker}

  <article class="card">
    <p>The new layout system landed in this morning's release.</p>
    <footer class="cluster" style="--gap: var(--pad-s); align-items: center;">
      {@html picker}
      <span class="text-muted fs-xs">128</span>
    </footer>
  </article>
</div>
