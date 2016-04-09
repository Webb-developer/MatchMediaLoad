// @author: Andrew Puig
// @version: 1.0
// @todo: add multi-media support.


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


        _hasSupport: typeof(window.matchMedia) === "function" ? true : false

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

            _checkAndReplace();


            var debounceResize = debounce(function(){
                _checkAndReplace();
            }, settings.debounceRate);


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

            items[i].setAttribute("src", items[i].getAttribute(settings.src));

            items[i].classList.add(settings.class);

        }

        if(typeof(settings.done) === "function"){
            settings.done(items);
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

            settings.done = options.done || undefined;

            
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