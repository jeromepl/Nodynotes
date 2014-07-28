/*!
 * iconic.js v0.4.0 - The Iconic JavaScript library
 * Copyright (c) 2014 Waybury - http://useiconic.com
 */

!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.IconicJS=e():"undefined"!=typeof global?global.IconicJS=e():"undefined"!=typeof self&&(self.IconicJS=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    var polyfills = require('./modules/polyfills');
    var svgInjector = require('./modules/svg-injector');
    var extend = require('./modules/extend');
    var responsive = require('./modules/responsive');
    var position = require('./modules/position');
    var container = require('./modules/container');
    var log = require('./modules/log');

    var config = {};

    // Holder for any Smart Icon Apis
    var smartIconApis = window.iconicSmartIconApis = {};

    var isLocal = window.location.protocol === 'file:';

    // Keep track of total injected SVGs, 'cause whynot
    var svgInjectedCount = 0;

    /**
 * Inject
 */
    var inject = function (elements, options, done) {

        // Use the config settings as defaults and override with
        // any passed options for this specific inject call
        options = extend({}, config, options || {});

        // Options we need to pass to the SvgInjector
        var svgInjectorOptions = {
            evalScripts: options.evalScripts,
            pngFallback: options.pngFallback
        };

        // For each injected SVG, attach its API
        svgInjectorOptions.each = function (svg) {

            if (svg) {
                // Error
                if (typeof svg === 'string') {
                    log.debug(svg);
                }
                // SVG Element
                else if (svg instanceof SVGSVGElement) {
                    // If this is a Smart Icon, create the API for the icon, initializing it with its
                    // own context so we can have multiple instances of each smart icon on a page.
                    // Look for and connect the proper API to the SVG
                    var svgApi = svg.getAttribute('data-icon');
                    if (svgApi && smartIconApis[svgApi]) {

                        var api = smartIconApis[svgApi](svg);
                        for (var apiMethod in api) {
                            // Since this is the simple function map object from
                            // the Smart Icon, we can skip the hasOwnProperty check
                            svg[apiMethod] = api[apiMethod];
                        }
                    }

                    // Add a wrapper background container, if needed
                    if ((/iconic-bg-/).test(svg.getAttribute('class'))) {
                        container.addBackground(svg);
                    }

                    // Call update() to initialize via icon.update(), responsive and position refresh
                    update(svg);

                    svgInjectedCount++;
                    if (options && options.each && typeof (options.each) === 'function') options.each(svg);
                }
            }
        };

        // Selector
        if (typeof elements === 'string') {
            elements = document.querySelectorAll(elements);
        }

        svgInjector(elements, svgInjectorOptions, done);
    };

    /**
 * Call the update() method of requested elements
 *
 * @param icon [null|selector|element]
 */
    var update = function (icon) {

        var iconsToUpdate = [];

        // Nothing passed, update everything that is updatable
        if (!icon) {
            iconsToUpdate = document.querySelectorAll('svg.iconic');
        }
        // Selector
        else if (typeof icon === 'string') {
            iconsToUpdate = document.querySelectorAll(icon);
        }
        // Array of elements
        else if (icon.length !== undefined) {
            iconsToUpdate = icon;
        }
        // Single element
        else if (typeof icon === 'object') {
            iconsToUpdate.push(icon);
        }

        Array.prototype.forEach.call(iconsToUpdate, function (icon) {
            if (icon instanceof SVGSVGElement) {
                if (icon.update) icon.update();
                responsive.refresh(icon);
                position.refresh(icon);
            }
        });
    };

    var doAutoInject = function (event) {
        if (config.debug && console.time) console.time('autoInjectSelector - ' + config.autoInjectSelector);
        var autoInjectedCountStart = svgInjectedCount;

        inject(config.autoInjectSelector, {}, function () {
            if (config.debug && console.timeEnd) console.timeEnd('autoInjectSelector - ' + config.autoInjectSelector);
            log.debug('AutoInjected: ' + (svgInjectedCount - autoInjectedCountStart));

            responsive.refreshAll();

            if (config.autoInjectDone && typeof (config.autoInjectDone) === 'function') {
                var totalAutoInjected = svgInjectedCount - autoInjectedCountStart;
                config.autoInjectDone(totalAutoInjected);
            }
        });

    };

    var autoInject = function (selector) {
        if (selector && selector !== '' && document.readyState !== 'complete') {
            document.addEventListener('DOMContentLoaded', doAutoInject);
        }
        else {
            document.removeEventListener('DOMContentLoaded', doAutoInject);
        }
    };


    /**
 * IconicJS
 *
 * @param {object} config
 * @return {object} instance of IconicJS
 *
 * Config Options
 * --------------
 *
 * autoInjectSelector - String
 * Default: img.iconic
 * ----------
 * Selector to use for auto-injection
 *
 * evalScript - ['always'|'once'|'never']
 * Default: once
 * ----------
 * Should we run the scripts blocks found in the SVG during injection
 * NOTE: For Iconic, we only need to run SVG scripts once per SVG
 * 'always'         - Run them everytime
 * 'once'           - Only run scripts once for each unique SVG (unique per SVG url)
 * ['never'|false]  - Ignore scripts
 *
 * pngFallback - [String|false] [optional]
 * Default: false
 * ----------
 * Location of fallback PNGs for supporting browsers that don't support SVG
 *
 * each - function
 * ----
 * Callback function to call after every svg injection
 *
 * autoInjectDone - function
 * --------------
 * Callback function to call when auto-injection is complete
 *
 * debug - Boolean
 * Default: false
 * -----
 * Enable/Disable debug messages
 *
 */
    var IconicJS = function (cnfg) {
        cnfg = cnfg || {};

        extend(config, cnfg);

        // Update auto inject setting
        autoInject(config.autoInjectSelector);

        log.enableDebug(config.debug);

        // Act Singleton-ish
        //
        // :NOTE: We need to have only a single IconicJS instance because
        // it contains shared state like the SVGInjector and its cache, and
        // the Smart Icon API code cache
        if (window._Iconic) return window._Iconic;

        return {
            inject: inject,
            update: update,
            smartIconApis: smartIconApis,
            svgInjectedCount: svgInjectedCount
        };
    };

    module.exports = IconicJS;

    // Create and seed the global _Iconic instance,
    // which will pick-up the default options. This
    // shouldn't be used directly
    window._Iconic = new IconicJS({
        autoInjectSelector: 'img.iconic',
        evalScripts: 'once',
        pngFallback: false,
        each: null,
        autoInjectDone: null,
        debug: false
    });

},{"./modules/container":2,"./modules/extend":3,"./modules/log":4,"./modules/polyfills":5,"./modules/position":6,"./modules/responsive":7,"./modules/svg-injector":8}],2:[function(require,module,exports){
    var addBackground = function (svg) {
        var svgClasses = svg.getAttribute('class').split(' ');
        var isFluid = (svgClasses.indexOf('iconic-fluid') !== -1);

        var filteredClasses = [];
        var wrapperClasses = ['iconic-bg'];
        Array.prototype.forEach.call(svgClasses, function (svgClass) {
            switch (svgClass) {
                case 'iconic-sm':
                case 'iconic-md':
                case 'iconic-lg':
                    filteredClasses.push(svgClass);

                    // Don't move any fixed size classes to the wrapper if the svg is fluid
                    if (!isFluid) wrapperClasses.push(svgClass.replace(/-/, '-bg-'));
                    break;

                case 'iconic-fluid':
                    filteredClasses.push(svgClass);
                    wrapperClasses.push(svgClass.replace(/-/, '-bg-'));
                    break;

                    // :TODO: Detect _any_ iconic-bg-* class?
                case 'iconic-bg-circle':
                case 'iconic-bg-rounded-rect':
                case 'iconic-bg-badge':
                    wrapperClasses.push(svgClass);
                    break;

                default:
                    filteredClasses.push(svgClass);
            }
        });

        // Update the svg classes with the filtered list
        svg.setAttribute('class', filteredClasses.join(' '));

        // Figure out where the svg currently is in the parent's childNodes list
        var svgParentNode = svg.parentNode;
        var svgPosition = Array.prototype.indexOf.call(svgParentNode.childNodes, svg);

        // Create the wrapper and move the svg into it
        var wrapper = document.createElement('span');
        wrapper.setAttribute('class', wrapperClasses.join(' '));
        wrapper.appendChild(svg);

        // Put the wrapper back where the svg originally was
        svgParentNode.insertBefore(wrapper, svgParentNode.childNodes[svgPosition]);
    };


    module.exports = {
        addBackground: addBackground
    };

},{}],3:[function(require,module,exports){
    module.exports = function extend(obj) {
        Array.prototype.forEach.call(Array.prototype.slice.call(arguments, 1), function (source) {
            if (source) {
                for (var prop in source) {
                    if (source.hasOwnProperty(prop)) obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };

},{}],4:[function(require,module,exports){
    var debugEnabled = false;

    var logMessage = function(message) {
        if (console &&  console.log) {
            console.log(message);
        }
    };

    var info = function (message) {
        logMessage('Iconic INFO: ' + message);
    };

    var warn = function (message) {
        logMessage('Iconic WARNING: ' + message);
    };

    var debug = function (message) {
        if(debugEnabled) logMessage('Iconic DEBUG: ' + message);
    };

    var enableDebug = function (enabled) {
        debugEnabled = enabled;
    };

    module.exports = {
        info: info,
        warn: warn,
        debug: debug,
        enableDebug: enableDebug
    };

},{}],5:[function(require,module,exports){
    /**
 * Array.forEach()
 * source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 */
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fn, scope) {
            'use strict';

            if (this === void 0 || this === null || typeof fn !== 'function') {
                throw new TypeError();
            }

            var i, len = this.length >>> 0;
            for (i = 0; i < len; ++i) {
                if (i in this) {
                    fn.call(scope, this[i], i, this);
                }
            }
        };
    }

    /**
 * EventTarget.addEventListener for IE8
 * source: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener
 */
    (function() {
        if (!Event.prototype.preventDefault) {
            Event.prototype.preventDefault=function() {
                this.returnValue=false;
            };
        }
        if (!Event.prototype.stopPropagation) {
            Event.prototype.stopPropagation=function() {
                this.cancelBubble=true;
            };
        }
        if (!Element.prototype.addEventListener) {
            var eventListeners=[];

            var addEventListener=function(type,listener /*, useCapture (will be ignored) */) {
                var self=this;
                var wrapper=function(e) {
                    e.target=e.srcElement;
                    e.currentTarget=self;
                    if (listener.handleEvent) {
                        listener.handleEvent(e);
                    } else {
                        listener.call(self,e);
                    }
                };
                if (type=="DOMContentLoaded") {
                    var wrapper2=function(e) {
                        if (document.readyState=="complete") {
                            wrapper(e);
                        }
                    };
                    document.attachEvent("onreadystatechange",wrapper2);
                    eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper2});

                    if (document.readyState=="complete") {
                        var e=new Event();
                        e.srcElement=window;
                        wrapper2(e);
                    }
                } else {
                    this.attachEvent("on"+type,wrapper);
                    eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper});
                }
            };
            var removeEventListener=function(type,listener /*, useCapture (will be ignored) */) {
                var counter=0;
                while (counter<eventListeners.length) {
                    var eventListener=eventListeners[counter];
                    if (eventListener.object==this && eventListener.type==type && eventListener.listener==listener) {
                        if (type=="DOMContentLoaded") {
                            this.detachEvent("onreadystatechange",eventListener.wrapper);
                        } else {
                            this.detachEvent("on"+type,eventListener.wrapper);
                        }
                        break;
                    }
                    ++counter;
                }
            };
            Element.prototype.addEventListener=addEventListener;
            Element.prototype.removeEventListener=removeEventListener;
            if (HTMLDocument) {
                HTMLDocument.prototype.addEventListener=addEventListener;
                HTMLDocument.prototype.removeEventListener=removeEventListener;
            }
            if (Window) {
                Window.prototype.addEventListener=addEventListener;
                Window.prototype.removeEventListener=removeEventListener;
            }
        }
    })();

    // getComputedStyle polyfill
    //
    // if (!window.getComputedStyle) {
    //   window.getComputedStyle = function (el, pseudo) {
    //     this.el = el;
    //     this.getPropertyValue = function (prop) {
    //       var re = /(\-([a-z]){1})/g;
    //       if (prop === 'float') prop = 'styleFloat';
    //       if (re.test(prop)) {
    //         prop = prop.replace(re, function () {
    //           return arguments[2].toUpperCase();
    //         });
    //       }
    //       return el.currentStyle[prop] ? el.currentStyle[prop] : null;
    //     };
    //     return this;
    //   };
    // }

    // Detect XML doc
    //
    // var isXmlDoc = function (el) {
    //   return (el.ownerDocument || el).documentElement.nodeName !== "HTML";
    // };


    // Page load state debugging, neat
    //
    // console.log(document.readyState);
    // document.onreadystatechange = function () {
    //   console.log(document.readyState);
    // }

},{}],6:[function(require,module,exports){
    var refresh = function (svg) {

        var positionAttr = svg.getAttribute('data-position');
        if (!positionAttr || positionAttr === '') return;

        var svgWidth = svg.getAttribute('width');
        var svgHeight = svg.getAttribute('height');

        // Break up the positioning into its components
        var positions = positionAttr.split('-');

        // Grab all the groups we need to position
        var layers = svg.querySelectorAll('g.iconic-container');

        var layerWidth, layerHeight, transform, scale, x, y, newTranslate;
        Array.prototype.forEach.call(layers, function (layer) {

            layerWidth = layer.getAttribute('data-width');
            layerHeight = layer.getAttribute('data-height');

            // Don't bother with layers that are the same size at the svg
            // Also, this could be a non-position-able svg, like arrow or caret
            if (layerWidth === svgWidth && layerHeight === svgHeight) return;

            transform = layer.getAttribute('transform');

            scale = 1;
            if (transform) {
                var scaleMatch = transform.match(/scale\((\d)/);
                scale = (scaleMatch && scaleMatch[1]) ? scaleMatch[1] : 1;
            }

            x = Math.floor(((svgWidth / scale) - layerWidth) / 2);
            y = Math.floor(((svgHeight / scale) - layerHeight) / 2);

            Array.prototype.forEach.call(positions, function (position) {
                switch (position) {
                    case 'top':
                        y = 0;
                        break;

                    case 'bottom':
                        y = svgHeight / scale - layerHeight;
                        break;

                    case 'left':
                        x = 0;
                        break;

                    case 'right':
                        x = svgWidth / scale - layerWidth;
                        break;

                    case 'center':
                        // The default calculation we start with above
                        break;

                    default:
                        // Dunno about that position, buddy
                        if (console && console.log) console.log('Unknown position: ' + position);
                }
            });

            newTranslate = (y === 0) ? x : x + ' ' + y;
            newTranslate = 'translate(' + newTranslate + ')';

            // No current transform
            if (!transform) {
                transform = newTranslate;
            }
            // Has a current translate, so replace it
            else if (/translate/.test(transform)) {
                transform = transform.replace(/translate\(.*?\)/, newTranslate);
            }
            // No translate, add it
            else {
                transform += ' ' + newTranslate;
            }

            layer.setAttribute('transform', transform);
        });
    };

    module.exports = {
        refresh: refresh
    };

},{}],7:[function(require,module,exports){
    var iconicClassRe = /(iconic-sm\b|iconic-md\b|iconic-lg\b)/;
    var nativeSizesCssCache = {};

    var getCssValue = function (target, hyphenProp) {
        var val = typeof (window.getComputedStyle) !== 'undefined' && window.getComputedStyle(target, null).getPropertyValue(hyphenProp);
        if (!val && target.currentStyle) {
            val = target.currentStyle[hyphenProp.replace(/([a-z])\-([a-z])/, function (a, b, c) {
                return b + c.toUpperCase();
            })] || target.currentStyle[hyphenProp];
        }
        return val;
    };

    var getElementDimensions = function (element) {

        // :HACK: :WORKAROUND: Firefox
        // All browsers besides Firefox have nice, properly calculated
        // [client|offset|scroll]width & height values for us to figure
        // out how big our SVG element is currently being displayed.
        //
        // Firefox also has a problem properly calculating width/height
        // of SVG 'path' elements that have stroke-widths > ~2 when
        // using getBoundingClientRect
        //
        // Our workaround is to make the SVG style 'display:block', grab the
        // width/height via getComputedStyle(), then reset the 'display' style.
        //
        // *sigh*
        //
        // Reference:
        // "it is nearly impossible in Firefox to get the size of the SVG element"
        // https://bugzilla.mozilla.org/show_bug.cgi?id=649285
        // https://bugzilla.mozilla.org/show_bug.cgi?id=874811

        // Also, we really want the actual size of the element _without_ padding,
        // so let's just use getComputedStyle() width/height which doesn't
        // include padding/margin/border/scroll

        var previousDisplay = element.style.display;
        element.style.display = 'block';

        var elementWidth = parseFloat(getCssValue(element, 'width').slice(0, -2));
        var elementHeight = parseFloat(getCssValue(element, 'height').slice(0, -2));
        // console.log("getComputedStyle: " + elementWidth + ' ' + elementHeight);

        element.style.display = previousDisplay;

        return {
            width: elementWidth,
            height: elementHeight
        };
    };

    var injectResponsiveCss = function () {
        var responsiveCss =
            '/* Iconic Responsive Support Styles */\n' +

            // Old sizing solution for cropped icons, that didn't work in IE9-11
            // 'svg.iconic {width:auto;height:auto;max-width:100%;max-height:100%;}\n' +

            // Performance
            // 'svg.iconic {-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);transform:translate3d(0,0,0);}\n' +
            // 'svg.iconic {-webkit-backface-visibility: hidden;-moz-backface-visibility: hidden;-ms-backface-visibility: hidden;backface-visibility: hidden;}\n' +
            // 'svg.iconic {-webkit-perspective:1000px;-moz-perspective:1000px;-ms-perspective:1000px;perspective:1000px;}\n' +

            //Styling/Theming fixes
            '.iconic-property-fill, .iconic-property-text {stroke: none !important;}\n' +
            '.iconic-property-stroke {fill: none !important;}\n' +

            // Sizing
            'svg.iconic.iconic-fluid {height:100% !important;width:100% !important;}\n' +
            'svg.iconic.iconic-sm:not(.iconic-size-md):not(.iconic-size-lg), svg.iconic.iconic-size-sm{width:16px;height:16px;}\n' +
            'svg.iconic.iconic-md:not(.iconic-size-sm):not(.iconic-size-lg), svg.iconic.iconic-size-md{width:32px;height:32px;}\n' +
            'svg.iconic.iconic-lg:not(.iconic-size-sm):not(.iconic-size-md), svg.iconic.iconic-size-lg{width:128px;height:128px;}\n' +

            // Responsive layer show/hide
            'svg.iconic-sm > g.iconic-md, svg.iconic-sm > g.iconic-lg, svg.iconic-md > g.iconic-sm, svg.iconic-md > g.iconic-lg, svg.iconic-lg > g.iconic-sm, svg.iconic-lg > g.iconic-md {display: none;}\n' +
            'svg.iconic.iconic-icon-sm > g.iconic-lg, svg.iconic.iconic-icon-md > g.iconic-lg {display:none;}\n' +
            'svg.iconic-sm:not(.iconic-icon-md):not(.iconic-icon-lg) > g.iconic-sm, svg.iconic-md.iconic-icon-sm > g.iconic-sm, svg.iconic-lg.iconic-icon-sm > g.iconic-sm {display:inline;}\n' +
            'svg.iconic-md:not(.iconic-icon-sm):not(.iconic-icon-lg) > g.iconic-md, svg.iconic-sm.iconic-icon-md > g.iconic-md, svg.iconic-lg.iconic-icon-md > g.iconic-md {display:inline;}\n' +
            'svg.iconic-lg:not(.iconic-icon-sm):not(.iconic-icon-md) > g.iconic-lg, svg.iconic-sm.iconic-icon-lg > g.iconic-lg, svg.iconic-md.iconic-icon-lg > g.iconic-lg {display:inline;}';

        // Browser :HACK - IE10, why you no like to handle clipPaths good?
        if (navigator && navigator.userAgent) {
            if (/MSIE 10\.0/.test(navigator.userAgent)) {
                responsiveCss += 'svg.iconic{zoom:1.0001;}';
            }
        }

        var style = document.createElement('style');
        style.id = 'iconic-responsive-css';
        style.type = 'text/css';

        if (style.styleSheet) {
            // IE
            style.styleSheet.cssText = responsiveCss;
        }
        else {
            style.appendChild(document.createTextNode(responsiveCss));
        }

        (document.head || document.getElementsByTagName('head')[0]).appendChild(style);
    };

    /**
 * Switch svg icon group based on current display size
 */
    var refresh = function (element) {
        // Only attempt to refresh elements with the iconic-fluid class
        if (!/iconic-fluid/.test(element.getAttribute('class'))) return;

        var elementDimensions = getElementDimensions(element);
        var aspectRatio = element.viewBox.baseVal.width / element.viewBox.baseVal.height;

        var shortSide;
        if (aspectRatio === 1) {
            shortSide = Math.min(elementDimensions.width, elementDimensions.height);
        }
        else {
            shortSide = (aspectRatio < 1) ? elementDimensions.width : elementDimensions.height;
        }

        // :TODO: Should we set break points on actual sm/md/lg 'g' sizes? or always 16/32/128px?
        // console.log(element.querySelectorAll('g.iconic-md')[0].getBBox().height);
        // console.log(element.querySelectorAll('g.iconic-md')[0].getBBox().width);

        var sizeClass;
        if (shortSide < 32) {
            sizeClass = 'iconic-sm';
        }
        else if (shortSide >= 32 && shortSide < 128) {
            sizeClass = 'iconic-md';
        }
        else {
            sizeClass = 'iconic-lg';
        }

        var currentClasses = element.getAttribute('class');
        var newClasses = iconicClassRe.test(currentClasses) ? currentClasses.replace(iconicClassRe, sizeClass) : currentClasses + ' ' + sizeClass;

        element.setAttribute('class', newClasses);
    };


    var refreshAll = function () {
        var elements = document.querySelectorAll('.injected-svg.iconic-fluid');
        Array.prototype.forEach.call(elements, function (element) {
            refresh(element);
        });
    };

    document.addEventListener('DOMContentLoaded', function () {
        injectResponsiveCss();
    });

    // :TODO: add debouncer
    window.addEventListener('resize', function () {
        refreshAll();
    });

    module.exports = {
        refresh: refresh,
        refreshAll: refreshAll
    };

},{}],8:[function(require,module,exports){
    /**
 * SVGInjector v1.1.0 - Fast, caching, dynamic inline SVG DOM injection library
 * https://github.com/iconic/SVGInjector
 *
 * Copyright (c) 2014 Waybury <hello@waybury.com>
 * @license MIT
 */

    (function (window, document) {

        'use strict';

        // Environment
        var isLocal = window.location.protocol === 'file:';
        var hasSvgSupport = document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');

        function uniqueClasses(list) {
            list = list.split(' ');

            var hash = {};
            var i = list.length;
            var out = [];

            while (i--) {
                if (!hash.hasOwnProperty(list[i])) {
                    hash[list[i]] = 1;
                    out.unshift(list[i]);
                }
            }

            return out.join(' ');
        }

        /**
   * cache (or polyfill for <= IE8) Array.forEach()
   * source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
   */
        var forEach = Array.prototype.forEach || function (fn, scope) {
            if (this === void 0 || this === null || typeof fn !== 'function') {
                throw new TypeError();
            }

            /* jshint bitwise: false */
            var i, len = this.length >>> 0;
            /* jshint bitwise: true */

            for (i = 0; i < len; ++i) {
                if (i in this) {
                    fn.call(scope, this[i], i, this);
                }
            }
        };

        // SVG Cache
        var svgCache = {};

        var injectCount = 0;
        var injectedElements = [];

        // Request Queue
        var requestQueue = [];

        // Script running status
        var ranScripts = {};

        var cloneSvg = function (sourceSvg) {
            return sourceSvg.cloneNode(true);
        };

        var queueRequest = function (url, callback) {
            requestQueue[url] = requestQueue[url] || [];
            requestQueue[url].push(callback);
        };

        var processRequestQueue = function (url) {
            for (var i = 0, len = requestQueue[url].length; i < len; i++) {
                // Make these calls async so we avoid blocking the page/renderer
                /* jshint loopfunc: true */
                (function (index) {
                    setTimeout(function () {
                        requestQueue[url][index](cloneSvg(svgCache[url]));
                    }, 0);
                })(i);
                /* jshint loopfunc: false */
            }
        };

        var loadSvg = function (url, callback) {
            if (svgCache[url] !== undefined) {
                if (svgCache[url] instanceof SVGSVGElement) {
                    // We already have it in cache, so use it
                    callback(cloneSvg(svgCache[url]));
                }
                else {
                    // We don't have it in cache yet, but we are loading it, so queue this request
                    queueRequest(url, callback);
                }
            }
            else {

                if (!window.XMLHttpRequest) {
                    callback('Browser does not support XMLHttpRequest');
                    return false;
                }

                // Seed the cache to indicate we are loading this URL already
                svgCache[url] = {};
                queueRequest(url, callback);

                var httpRequest = new XMLHttpRequest();

                httpRequest.onreadystatechange = function () {
                    // readyState 4 = complete
                    if (httpRequest.readyState === 4) {

                        // Handle status
                        if (httpRequest.status === 404 || httpRequest.responseXML === null) {
                            callback('Unable to load SVG file: ' + url);

                            if (isLocal) callback('Note: SVG injection ajax calls do not work locally without adjusting security setting in your browser. Or consider using a local webserver.');

                            callback();
                            return false;
                        }

                        // 200 success from server, or 0 when using file:// protocol locally
                        if (httpRequest.status === 200 || (isLocal && httpRequest.status === 0)) {

                            /* globals Document */
                            if (httpRequest.responseXML instanceof Document) {
                                // Cache it
                                svgCache[url] = httpRequest.responseXML.documentElement;
                            }
                            /* globals -Document */

                            // IE9 doesn't create a responseXML Document object from loaded SVG,
                            // and throws a "DOM Exception: HIERARCHY_REQUEST_ERR (3)" error when injected.
                            //
                            // So, we'll just create our own manually via the DOMParser using
                            // the the raw XML responseText.
                            //
                            // :NOTE: IE8 and older doesn't have DOMParser, but they can't do SVG either, so...
                            else if (DOMParser && (DOMParser instanceof Function)) {
                                var xmlDoc;
                                try {
                                    var parser = new DOMParser();
                                    xmlDoc = parser.parseFromString(httpRequest.responseText, 'text/xml');
                                }
                                catch (e) {
                                    xmlDoc = undefined;
                                }

                                if (!xmlDoc || xmlDoc.getElementsByTagName('parsererror').length) {
                                    callback('Unable to parse SVG file: ' + url);
                                    return false;
                                }
                                else {
                                    // Cache it
                                    svgCache[url] = xmlDoc.documentElement;
                                }
                            }

                            // We've loaded a new asset, so process any requests waiting for it
                            processRequestQueue(url);
                        }
                        else {
                            callback('There was a problem injecting the SVG: ' + httpRequest.status + ' ' + httpRequest.statusText);
                            return false;
                        }
                    }
                };

                httpRequest.open('GET', url);

                // Treat and parse the response as XML, even if the
                // server sends us a different mimetype
                if (httpRequest.overrideMimeType) httpRequest.overrideMimeType('text/xml');

                httpRequest.send();
            }
        };

        // Inject a single element
        var injectElement = function (el, evalScripts, pngFallback, callback) {

            // Grab the src or data-src attribute
            var imgUrl = el.getAttribute('data-src') || el.getAttribute('src');

            // We can only inject SVG
            if (!(/svg$/i).test(imgUrl)) {
                callback('Attempted to inject a file with a non-svg extension: ' + imgUrl);
                return;
            }

            // If we don't have SVG support try to fall back to a png,
            // either defined per-element via data-fallback or data-png,
            // or globally via the pngFallback directory setting
            if (!hasSvgSupport) {
                var perElementFallback = el.getAttribute('data-fallback') || el.getAttribute('data-png');

                // Per-element specific PNG fallback defined, so use that
                if (perElementFallback) {
                    el.setAttribute('src', perElementFallback);
                    callback(null);
                }
                // Global PNG fallback directoriy defined, use the same-named PNG
                else if (pngFallback) {
                    el.setAttribute('src', pngFallback + '/' + imgUrl.split('/').pop().replace('.svg', '.png'));
                    callback(null);
                }
                // um...
                else {
                    callback('This browser does not support SVG and no PNG fallback was defined.');
                }

                return;
            }

            // Make sure we aren't already in the process of injecting this element to
            // avoid a race condition if multiple injections for the same element are run.
            // :NOTE: Using indexOf() only _after_ we check for SVG support and bail,
            // so no need for IE8 indexOf() polyfill
            if (injectedElements.indexOf(el) !== -1) {
                return;
            }

            // Remember the request to inject this element, in case other injection
            // calls are also trying to replace this element before we finish
            injectedElements.push(el);

            // Try to avoid loading the orginal image src if possible.
            el.setAttribute('src', '');

            // Load it up
            loadSvg(imgUrl, function (svg) {

                if (typeof svg === 'undefined' || typeof svg === 'string') {
                    callback(svg);
                    return false;
                }

                var imgId = el.getAttribute('id');
                if (imgId) {
                    svg.setAttribute('id', imgId);
                }

                var imgTitle = el.getAttribute('title');
                if (imgTitle) {
                    svg.setAttribute('title', imgTitle);
                }

                // Concat the SVG classes + 'injected-svg' + the img classes
                var classMerge = [].concat(svg.getAttribute('class') || [], 'injected-svg', el.getAttribute('class') || []).join(' ');
                svg.setAttribute('class', uniqueClasses(classMerge));

                var imgStyle = el.getAttribute('style');
                if (imgStyle) {
                    svg.setAttribute('style', imgStyle);
                }

                // Copy all the data elements to the svg
                var imgData = [].filter.call(el.attributes, function (at) {
                    return (/^data-\w[\w\-]*$/).test(at.name);
                });
                forEach.call(imgData, function (dataAttr) {
                    if (dataAttr.name && dataAttr.value) {
                        svg.setAttribute(dataAttr.name, dataAttr.value);
                    }
                });

                // Make sure any internally referenced clipPath ids and their
                // clip-path references are unique.
                //
                // This addresses the issue of having multiple instances of the
                // same SVG on a page and only the first clipPath id is referenced.
                //
                // Browsers often shortcut the SVG Spec and don't use clipPaths
                // contained in parent elements that are hidden, so if you hide the first
                // SVG instance on the page, then all other instances lose their clipping.
                // Reference: https://bugzilla.mozilla.org/show_bug.cgi?id=376027
                var clipPaths = svg.querySelectorAll('defs clipPath[id]');
                var newClipPathName;
                for (var i = 0, clipPathsLen = clipPaths.length; i < clipPathsLen; i++) {
                    newClipPathName = clipPaths[i].id + '-' + injectCount;
                    // :NOTE: using a substring match attr selector here to deal with IE "adding extra quotes in url() attrs"
                    var usingClipPath = svg.querySelectorAll('[clip-path*="' + clipPaths[i].id + '"]');
                    for (var j = 0, usingClipPathLen = usingClipPath.length; j < usingClipPathLen; j++) {
                        usingClipPath[j].setAttribute('clip-path', 'url(' + window.location.href + '#' + newClipPathName + ')');
                    }
                    clipPaths[i].id = newClipPathName;
                }

                // Remove any unwanted/invalid namespaces that might have been added by SVG editing tools
                svg.removeAttribute('xmlns:a');

                // Post page load injected SVGs don't automatically have their script
                // elements run, so we'll need to make that happen, if requested

                // Find then prune the scripts
                var scripts = svg.querySelectorAll('script');
                var scriptsToEval = [];
                var script, scriptType;

                for (var k = 0, scriptsLen = scripts.length; k < scriptsLen; k++) {
                    scriptType = scripts[k].getAttribute('type');

                    // Only process javascript types.
                    // SVG defaults to 'application/ecmascript' for unset types
                    if (!scriptType || scriptType === 'application/ecmascript' || scriptType === 'application/javascript') {

                        // innerText for IE, textContent for other browsers
                        script = scripts[k].innerText || scripts[k].textContent;

                        // Stash
                        scriptsToEval.push(script);

                        // Tidy up and remove the script element since we don't need it anymore
                        svg.removeChild(scripts[k]);
                    }
                }

                // Run/Eval the scripts if needed
                if (scriptsToEval.length > 0 && (evalScripts === 'always' || (evalScripts === 'once' && !ranScripts[imgUrl]))) {
                    for (var l = 0, scriptsToEvalLen = scriptsToEval.length; l < scriptsToEvalLen; l++) {

                        // :NOTE: Yup, this is a form of eval, but it is being used to eval code
                        // the caller has explictely asked to be loaded, and the code is in a caller
                        // defined SVG file... not raw user input.
                        //
                        // Also, the code is evaluated in a closure and not in the global scope.
                        // If you need to put something in global scope, use 'window'
                        new Function(scriptsToEval[l])(window); // jshint ignore:line
                    }

                    // Remember we already ran scripts for this svg
                    ranScripts[imgUrl] = true;
                }

                // Replace the image with the svg
                el.parentNode.replaceChild(svg, el);

                // Now that we no longer need it, drop references
                // to the original element so it can be GC'd
                delete injectedElements[injectedElements.indexOf(el)];
                el = null;

                // Increment the injected count
                injectCount++;

                callback(svg);
            });
        };

        /**
   * SVGInjector
   *
   * Replace the given elements with their full inline SVG DOM elements.
   *
   * :NOTE: We are using get/setAttribute with SVG because the SVG DOM spec differs from HTML DOM and
   * can return other unexpected object types when trying to directly access svg properties.
   * ex: "className" returns a SVGAnimatedString with the class value found in the "baseVal" property,
   * instead of simple string like with HTML Elements.
   *
   * @param {mixes} Array of or single DOM element
   * @param {object} options
   * @param {function} callback
   * @return {object} Instance of SVGInjector
   */
        var SVGInjector = function (elements, options, done) {

            // Options & defaults
            options = options || {};

            // Should we run the scripts blocks found in the SVG
            // 'always' - Run them every time
            // 'once' - Only run scripts once for each SVG
            // [false|'never'] - Ignore scripts
            var evalScripts = options.evalScripts || 'always';

            // Location of fallback pngs, if desired
            var pngFallback = options.pngFallback || false;

            // Callback to run during each SVG injection, returning the SVG injected
            var eachCallback = options.each;

            // Do the injection...
            if (elements.length !== undefined) {
                var elementsLoaded = 0;
                forEach.call(elements, function (element) {
                    injectElement(element, evalScripts, pngFallback, function (svg) {
                        if (eachCallback && typeof eachCallback === 'function') eachCallback(svg);
                        if (done && elements.length === ++elementsLoaded) done(elementsLoaded);
                    });
                });
            }
            else {
                if (elements) {
                    injectElement(elements, evalScripts, pngFallback, function (svg) {
                        if (eachCallback && typeof eachCallback === 'function') eachCallback(svg);
                        if (done) done(1);
                        elements = null;
                    });
                }
                else {
                    if (done) done(0);
                }
            }
        };

        /* global module, exports: true, define */
        // Node.js or CommonJS
        if (typeof module === 'object' && typeof module.exports === 'object') {
            module.exports = exports = SVGInjector;
        }
        // AMD support
        else if (typeof define === 'function' && define.amd) {
            define(function () {
                return SVGInjector;
            });
        }
        // Otherwise, attach to window as global
        else if (typeof window === 'object') {
            window.SVGInjector = SVGInjector;
        }
        /* global -module, -exports, -define */

    }(window, document));

},{}]},{},[1])
(1)
});
