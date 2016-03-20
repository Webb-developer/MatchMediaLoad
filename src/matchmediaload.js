// @author: Andrew Puig
// @version: 1.0


var MatchMediaLoad = (function(window, document){

    'use strict';


    var settings = {

        selector: document.getElementsByClassName("js-match-media"),
        src: "data-src",
        mediaQuery: "data-match",
        class: "match-media--replaced",

        debounceRate: 250,

        cache: [],

        support: typeof(window.matchMedia) === "function" ? true : false

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

        if(settings.support === true){

            // proceed normally

            _checkIfMatch();


            var debounceResize = debounce(function(){

                _checkIfMatch();

            }, settings.debounceRate);


            window.onresize = function(){
                debounceResize();
            };

        } else {
            _replace(settings.selector);
        }

    };


    var _checkIfMatch = function(){

        var accepted = [];


        for (var i = 0, l = settings.selector.length; i < l; i++) {

            if(settings.cache.indexOf(settings.selector[i]) === -1){
            
                if(window.matchMedia(settings.selector[i].getAttribute(settings.mediaQuery)).matches === true){

                    accepted.push(settings.selector[i]);

                    settings.cache.push(settings.selector[i]);

                }

            }

        }


        for (var i2 = 0, l2 = settings.selector.length; i2 < l2; i2++) {

            if(settings.cache.indexOf(accepted[i2]) !== -1){

                _replace(accepted);

            }

        }

    };


    var _replace = function(items){

        for (var i = 0, l = items.length; i < l; i++) {

            items[i].setAttribute("src", items[i].getAttribute(settings.src));

            items[i].classList.add(settings.class);

        }

        if(typeof(settings.done) === "function"){
            settings.done();
        }

    };


    var run = function(options){

        if(typeof(options) === "object"){

            // Our settings object gets augmented
            // if the user sets custom options

            settings.selector = options.selector || settings.selector;

            settings.src = options.src || settings.src;

            settings.mediaQuery = options.mediaQuery || settings.mediaQuery;

            settings.class = options.class || settings.class;

            if(options.debounceRate === 0){
                settings.debounceRate = 0;
            } else if(options.debounceRate !== undefined && options.debounceRate !== 0){
                settings.debounceRate = options.debounceRate;
            }

            settings.done = options.done || undefined;

            
            // Use the augmented settings

            _bindUI(settings);

        } else if(typeof(options) === "undefined"){

            // Use the default settings

            _bindUI(settings);
        }

    };


    return{
        run: run
    };


})(window, document);