// @author: Andrew Puig
// @version: 1.5


var MatchMediaLoad = (function(window){

    'use strict';


    var settings = {

        // @property {array} selector - match media element selector.
        selector: document.getElementsByClassName("js-match-media"),

        // @property {string} data-src - element attribute which contains the src.
        src: "data-src",

        // @property {string} data-match - element attribute which contains
        // the media query to match.
        mediaQuery: "data-match",

        // @property {string} class - class that will be applied to each element
        // once it has been replaced.
        class: "match-media--replaced",

        // @property {number} debounceRate - the debounce rate for window.onresize.
        debounceRate: 150,


        // @property {array} _cache - elements that have been replaced
        // will be pushed here. We check against the cache so we dont
        // check the same media object more than once.
        _cache: [],


        // Check for window.matchMedia support. 
        _hasSupport: typeof(window.matchMedia) === "function" ? true : false,


        // @property {regex} FORMAT - regex to check for valid video file types. 
        _video: {
            FORMAT: new RegExp(/\.(ogg|mp4|webm)$/i)
        }

    };


    // Thanks to David Walsh for the debounce()
    // https://davidwalsh.name/javascript-debounce-function
    var debounce = function(func, wait, immediate) {

        var timeout;


        return function() {

            var context = this;

            var args = arguments;

            var later = function() {
                timeout = null;
                if (!immediate){
                    func.apply(context, args);
                }
            };

            var callNow = immediate && !timeout;

            clearTimeout(timeout);

            timeout = setTimeout(later, wait);

            if (callNow){
                func.apply(context, args);
            }
        };
    };


    var _bindUI = function(){

        // The browser supports matchMedia so proceed.
        if(settings._hasSupport){

            var debounceResize = debounce(function(){
                _checkAndReplace();
            }, settings.debounceRate);


            _checkAndReplace();

            window.onresize = function(){
                debounceResize();
            };

        } else {
            // The browser does not support matchMedia
            // proceed by immediately showing the media objects.
            _replace(settings.selector);
        }

    };


    var _checkAndReplace = function(){

        var accepted = [];


        for (var i = 0, l = settings.selector.length; i < l; i++) {

            // Make sure we dont check the same media object
            // more than once.
            if(settings._cache.indexOf(settings.selector[i]) === -1){
                
                // Check if the media query matches.
                if(window.matchMedia(settings.selector[i].getAttribute(settings.mediaQuery)).matches){

                    // Add the media object to the accepted array.
                    accepted.push(settings.selector[i]);

                    // Add the media object to the cache.
                    settings._cache.push(settings.selector[i]);

                    // Add the src attribute to the accepted media objects.
                    _replace(accepted);

                }

            }
        }

    };


    // @param {array} items - the items that have
    // been matched and can be replaced.
    var _replace = function(items){

        for (var i = 0, l = items.length; i < l; i++) {

            // It's a video. Treat it specially.
            if(items[i].tagName === "VIDEO"){

                // Loop through video sources.
                for (var ii = 0, ll = items[i].getAttribute(settings.src).split(", ").length; ii < ll; ii++) {

                    // Check for a valid video file extension and 
                    // check for the first available video format that can be played in the browser.
                    if(items[i].getAttribute(settings.src).split(", ")[ii].search(settings._video.FORMAT) !== -1 && items[i].canPlayType("video/" + items[i].getAttribute(settings.src).split(", ")[ii].match(settings._video.FORMAT)[1]) !== ""){

                        items[i].setAttribute("src", items[i].getAttribute(settings.src).split(", ")[ii]);

                        items[i].classList.add(settings.class);

                        items[i].play();

                        break;

                    }

                }

            } else if(items[i].tagName !== "IMG") {

                items[i].style.backgroundImage = "url(" + items[i].getAttribute(settings.src) + ")";

                items[i].classList.add(settings.class);

            } else {

                items[i].setAttribute("src", items[i].getAttribute(settings.src));

                items[i].classList.add(settings.class);

            }

        }


        // settings.after() returns the replaced element.
        if(typeof(settings.after) === "function"){
            settings.after(items);
        }

    };


    // @param {object} options - the user defined settings
    var run = function(options){

        // Our settings object gets augmented
        // if the user sets custom options.
        if(typeof(options) === "object"){

            settings.selector = options.selector || settings.selector;

            settings.src = options.src || settings.src;

            settings.mediaQuery = options.mediaQuery || settings.mediaQuery;

            settings.class = options.class || settings.class;

            if(options.debounceRate === 0){
                settings.debounceRate = 0;
            } else if(options.debounceRate !== undefined){
                settings.debounceRate = options.debounceRate;
            }

            settings.after = options.after || undefined;
            
            
            // Use the user augmented settings
            _bindUI(settings);

        } else {

            // Use the default settings
            _bindUI(settings);

        }

    };


    return{
        run: run
    };


})(window);
