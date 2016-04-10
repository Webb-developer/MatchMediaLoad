# MatchMediaLoad

Load media based on a specified breakpoint to help reduce HTTP requests until needed.
Currently, MatchMediaLoad supports images and HTML5 videos.



###Usage:
<code>img data-src="my-image.png" class="js-match-media" data-match="(min-width: 1000px)"</code>


####For HTML5 Video:
<code><video data-src="video1.mp4, video2.ogg" class="js-match-media" data-match="(min-width: 900px)"></video></code>

Split multiple video sources with a comma and a space ", "
MatchMediaLoad will accept .mp4, .ogg and .webm file types. It will play the first 
supported file format by the browser.




<ul>
    <li>Replace your image src attribute with <code>data-src</code></li>
    <li>Add a <code>js-match-media</code> class</li>
    <li>Provide a media query in <code>data-match</code>. When this query is met the media will be loaded by replacing <code>data-src</code> with <code>src</code></li>
</ul>


<code>data-match</code> accepts any valid <code>window.matchMedia()</code> query. See <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia">window.matchMedia() documentation</a>



window.matchMedia() has fairly good browser support. IE9 and below doesnt't support it.
For those browsers that dont support window.matchMedia() MatchMediaLoad will just replace
data-src to src immediately.





### Usage with optional parameters {object}


```javascript
MatchMediaLoad.run({

    // {object}
    selector: document.getElementsByClassName("js-match-media"), // Plain javascript or jQuery

    // {string}
    src: "data-src",

    // {string}
    mediaQuery: "data-match", // A window.matchMedia() media query

    // {string}
    class: "match-media--replaced", // Class name that will be applied once the image has been replaced 

    // {number}
    debounceRate: 150, // Debounce rate for window resize. 0 for no debounce.

    // @returns {object} - Returns any elements that have been replaced.
    // Called after any matching media has been replaced.
    after: function(el){
        console.log(el + " replaced");
    }

});
```
=======
