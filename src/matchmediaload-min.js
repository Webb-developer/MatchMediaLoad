var MatchMediaLoad=function(e){"use strict";var t={selector:document.getElementsByClassName("js-match-media"),src:"data-src",mediaQuery:"data-match","class":"match-media--replaced",debounceRate:150,_cache:[],_hasSupport:"function"==typeof e.matchMedia?!0:!1,_video:{FORMAT:new RegExp(/\.(ogg|mp4|webm)$/i)}},a=function(e,t,a){var c;return function(){var r=this,s=arguments,i=function(){c=null,a||e.apply(r,s)},o=a&&!c;clearTimeout(c),c=setTimeout(i,t),o&&e.apply(r,s)}},c=function(){if(t._hasSupport){r();var c=a(function(){r()},t.debounceRate);e.onresize=function(){c()}}else s(t.selector)},r=function(){for(var a=[],c=0,r=t.selector.length;r>c;c++)-1===t._cache.indexOf(t.selector[c])&&e.matchMedia(t.selector[c].getAttribute(t.mediaQuery)).matches&&(a.push(t.selector[c]),t._cache.push(t.selector[c]),s(a))},s=function(e){for(var a=0,c=e.length;c>a;a++)if("VIDEO"===e[a].tagName){for(var r=0,s=e[a].getAttribute(t.src).split(", ").length;s>r;r++)if(-1!==e[a].getAttribute(t.src).split(", ")[r].search(t._video.FORMAT)&&""!==e[a].canPlayType("video/"+e[a].getAttribute(t.src).split(", ")[r].match(t._video.FORMAT)[1])){e[a].setAttribute("src",e[a].getAttribute(t.src).split(", ")[r]),e[a].classList.add(t["class"]),e[a].play();break}}else e[a].setAttribute("src",e[a].getAttribute(t.src)),e[a].classList.add(t["class"]);"function"==typeof t.after&&t.after(e)},i=function(e){"object"==typeof e?(t.selector=e.selector||t.selector,t.src=e.src||t.src,t.mediaQuery=e.mediaQuery||t.mediaQuery,t["class"]=e["class"]||t["class"],0===e.debounceRate?t.debounceRate=0:void 0!==e.debounceRate&&(t.debounceRate=e.debounceRate),t.after=e.after||void 0,c(t)):c(t)};return{run:i}}(window);