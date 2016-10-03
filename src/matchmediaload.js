/**
@author: Andrew Puig
@version: 1.55
@todo add matchMedia polyfill
*/


var MatchMediaLoad = (function(window){

    'use strict';

    var settings = {

        /**
        @property {object} settings.selector
        The target element.
        */
        selector: document.getElementsByClassName("js-match-media"),

        /**
        @property {string} settings.src
        The settings.selector attribute whose value contains
        the pseudo src.
        */
        src: "data-src",

        /**
        @property {string} settings.mediaQuery
        The settings.selector attribute whose value contains
        the media query to match.
        */
        mediaQuery: "data-match",

        /**
        @const
        @property {string} settings.class
        The class that will be applied to each element
        once it has been replaced.
        */
        class: "match-media--replaced",

        /**
        @const
        @property {number} settings.debounceRate
        The debounce rate for the window resize event.
        */
        debounceRate: 150,

        /**
        @property {array} settings._cache
        Elements that have been replaced will be pushed here.
        We check against the cache so we dont check
        the same media object more than once.
        */
        _cache: [],

        /*
        Check for window.matchMedia support.
        */
        _hasSupport: typeof(window.matchMedia) === "function" ? true : false,

        _video: {
            /**
            @property {regex} settings.FORMAT
            A regex to check for valid video extensions.
            */
            FORMAT: new RegExp(/\.(ogg|mp4|webm)$/i)
        }

    };

    var timeout;


    var _bindUI = function(){

        // The browser supports matchMedia so proceed.
        if(settings._hasSupport){

            // Initial check.
            _checkAndReplace();

            // Check on resize of course.
            window.onresize = function(){

                clearTimeout(timeout);

                timeout = setTimeout(function(){
                    _checkAndReplace();
                }, settings.debounceRate);

            };

        } else {
            // The browser does not support matchMedia
            // proceed by immediately showing the media objects.
            _replace(settings.selector);
        }

    };


    var _checkAndReplace = function(){

        // This wil store the elements that have matching media queries.
        var accepted = [];

        for (var i = 0, l = settings.selector.length; i < l; i++) {

            // Make sure we dont check the same media object
            // more than once.
            if(settings._cache.indexOf(settings.selector[i]) === -1){

                // Check if the media query matches.
                if(matchMedia(settings.selector[i].getAttribute(settings.mediaQuery)).matches){

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


    /**
    @param {array} items - the items that have
    been matched and can be replaced.
    */
    var _replace = function(items){

        for (var i = 0, l = items.length; i < l; i++){

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


    /**
    @param {object} options - the user defined settings
    */
    var run = function(options){

        /*
        Our settings object gets augmented
        if the user sets custom options.
        */
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


})(window).run();
