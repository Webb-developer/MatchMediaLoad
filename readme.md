# MatchMediaLoad

Load images based on a specified breakpoint to help reduce HTTP requests until needed.


<code>img data-src="myDesktopImage.png" alt="" class="js-match-media" data-match="(min-width: 1000px)"</code>


<ul>
    <li>Replace your image src attribute with <code>data-src</code></li>
    <li>Add a <code>js-match-media</code> class</li>
    <li>Provide a media query in <code>data-match</code>. When this query is met the image will be loaded by replacing <code>data-src</code> with <code>src</code></li>
</ul>


<code>data-match</code> accepts any valid <code>window.matchMedia()</code> query. See <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia">window.matchMedia() documentation</a>
<<<<<<< HEAD


Usage: <code>MatchMediaLoad.run();</code>


Usage with optional parameters (Object)

```javascript
MatchMediaLoad.run({
    selector: "js-match-media", // Expects plain JavaScript class
    src: "data-src",
    mediaQuery: "data-match", // A window.matchMedia() media query
    class: "replaced", // Class name that will be applied once the image has been replaced 
    debounceRate: 250, // Debounce rate for window resize. 0 for no debounce.
});
```
=======