<div class="stack">
  <!-- Display form: read-only star meter, partial fill via --rating (0–5).
       Always pair with an aria-label so the value is announced. -->
  <div class="stack" style="--gap: 0.5rem">
    <span class="text-muted">Display (read-only)</span>
    <span
      class="rating"
      style="--rating: 5"
      role="img"
      aria-label="Rated 5 out of 5"
    ></span>
    <span
      class="rating"
      style="--rating: 3.5"
      role="img"
      aria-label="Rated 3.5 out of 5"
    ></span>
    <span
      class="rating"
      style="--rating: 1.5"
      role="img"
      aria-label="Rated 1.5 out of 5"
    ></span>
    <span
      class="rating"
      style="--rating: 0"
      role="img"
      aria-label="Not yet rated"
    ></span>
  </div>

  <!-- Input form: native radios + labels in reverse source order so
       :checked / :hover fill the current star and every star before it.
       Zero JS; degrades to native radio buttons. -->
  <div class="stack" style="--gap: 0.5rem">
    <span class="text-muted">Input (interactive)</span>
    <fieldset class="rating">
      <legend class="visually-hidden">Rate this item</legend>
      <input type="radio" id="rate-5" name="demo-rate" value="5" />
      <label for="rate-5" aria-label="5 stars"></label>
      <input type="radio" id="rate-4" name="demo-rate" value="4" />
      <label for="rate-4" aria-label="4 stars"></label>
      <input type="radio" id="rate-3" name="demo-rate" value="3" checked />
      <label for="rate-3" aria-label="3 stars"></label>
      <input type="radio" id="rate-2" name="demo-rate" value="2" />
      <label for="rate-2" aria-label="2 stars"></label>
      <input type="radio" id="rate-1" name="demo-rate" value="1" />
      <label for="rate-1" aria-label="1 star"></label>
    </fieldset>
  </div>
</div>
