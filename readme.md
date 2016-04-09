# MatchMediaLoad

Load images based on a specified breakpoint to help reduce HTTP requests until needed.



###Usage:
<code>img data-src="myDesktopImage.png" alt="" class="js-match-media" data-match="(min-width: 1000px)"</code>



<ul>
    <li>Replace your image src attribute with <code>data-src</code></li>
    <li>Add a <code>js-match-media</code> class</li>
    <li>Provide a media query in <code>data-match</code>. When this query is met the image will be loaded by replacing <code>data-src</code> with <code>src</code></li>
</ul>


<code>data-match</code> accepts any valid <code>window.matchMedia()</code> query. See <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia">window.matchMedia() documentation</a>



window.matchMedia() has fairly good browser support. IE9 and below doesnt't support it.
For those browsers that dont support window.matchMedia() MatchMediaLoad will just replace
data-src to src immediately.




###JavaScript Usage:
<code>MatchMediaLoad.run();</code>


###JavaScript usage with optional parameters (Object)


```javascript
MatchMediaLoad.run({
    selector: document.getElementsByClassName("js-match-media"), // Plain javascript or jQuery
    src: "data-src",
    mediaQuery: "data-match", // A window.matchMedia() media query
    class: "match-media--replaced", // Class name that will be applied once the image has been replaced 
    debounceRate: 150, // Debounce rate for window resize. 0 for no debounce.
    done: function(){ // Function that is called after the image has been replaced
        console.log("Image replaced");
    }
});
```
=======
