<div class="cluster">
  <button popovertarget="drawer-demo-left" class="button">Left</button>
  <button popovertarget="drawer-demo-right" class="button">Right</button>
  <button popovertarget="drawer-demo-top" class="button">Top</button>
  <button popovertarget="drawer-demo-bottom" class="button">Bottom</button>
</div>

<aside id="drawer-demo-left" popover class="drawer">
  <header><h3>Left drawer</h3></header>
  <p>Default anchor — slides in from the inline start.</p>
  <button popovertarget="drawer-demo-left" popovertargetaction="hide" class="button">Close</button>
</aside>

<aside id="drawer-demo-right" popover class="drawer right">
  <header><h3>Right drawer</h3></header>
  <p>Anchors to the inline end. <code>.end</code> works too.</p>
  <button popovertarget="drawer-demo-right" popovertargetaction="hide" class="button">Close</button>
</aside>

<aside id="drawer-demo-top" popover class="drawer top">
  <header><h3>Top drawer</h3></header>
  <p>Drops down from the top of the viewport. Caps at 85dvh.</p>
  <button popovertarget="drawer-demo-top" popovertargetaction="hide" class="button">Close</button>
</aside>

<aside id="drawer-demo-bottom" popover class="drawer bottom">
  <header><h3>Bottom drawer</h3></header>
  <p>Slides up from the bottom — useful for mobile action sheets and filter panels.</p>
  <button popovertarget="drawer-demo-bottom" popovertargetaction="hide" class="button">Close</button>
</aside>
