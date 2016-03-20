// @author: Andrew Puig
// @version: 1.0


var MatchMediaLoad = (function(window){

    'use strict';


    var settings = {

        selector: "js-match-media",
        src: "data-src",
        mediaQuery: "data-match",
        class: "replaced",

        debounceRate: 250,

        cache: [],

        support: typeof(window.matchMedia) === "function" ? true : false

    };


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


    var _bindUI = function(){ // 2

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
            _replace(document.getElementsByClassName(settings.selector));
        }

    };


    var _checkIfMatch = function(){ // 3

        var accepted = [];

        var gather   = _gatherItems();


        for (var i = 0, l = gather.length; i < l; i++) {

            if(settings.cache.indexOf(gather[i]) === -1){
            
                if(window.matchMedia(gather[i].getAttribute(settings.mediaQuery)).matches === true){

                    accepted.push(gather[i]);

                    settings.cache.push(gather[i]);

                }

            }

        }


        for (var i2 = 0, l2 = gather.length; i2 < l2; i2++) {

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


    var _gatherItems = function(){

        var items = [];

        var itemsArray = document.getElementsByClassName(settings.selector);


        for (var i = 0, l = itemsArray.length; i < l; i++) {
            items.push(itemsArray[i]);
        }


        return items;

    };


    var run = function(options){

        if(typeof(options) === "object"){


            // Our settings object gets augmented
            // if the user set custom options

            settings.selector = options.selector || settings.selector;

            settings.src = options.src || settings.src;

            settings.mediaQuery = options.mediaQuery || settings.mediaQuery;

            settings.class = options.class || settings.class;

            settings.debounceRate = options.debounceRate || settings.debounceRate;

            settings.done = options.done || "undefined";

            
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


})(window);



MatchMediaLoad.run();

