(function ($, window, document, undefined) {
    var header_helpers = function (class_array) {
        var i = class_array.length;
        var head = $('head');
        while (i--) {
            if (head.has('.' + class_array[i]).length === 0) {
                head.append('<meta class="' + class_array[i] + '" />');
            }
        }
    };
    header_helpers([
        'foundation-mq-small',
        'foundation-mq-medium',
        'foundation-mq-large',
        'foundation-mq-xlarge',
        'foundation-mq-xxlarge',
        'foundation-data-attribute-namespace'
    ]);
    $(function () {
        if (typeof FastClick !== 'undefined') {
            if (typeof document.body !== 'undefined') {
                FastClick.attach(document.body);
            }
        }
    });
    var S = function (selector, context) {
        if (typeof selector === 'string') {
            if (context) {
                var cont;
                if (context.jquery) {
                    cont = context[0];
                    if (!cont)
                        return context;
                }
                else {
                    cont = context;
                }
                return $(cont.querySelectorAll(selector));
            }
            return $(document.querySelectorAll(selector));
        }
        return $(selector, context);
    };
    var attr_name = function (init) {
        var arr = [];
        if (!init)
            arr.push('data');
        if (this.namespace.length > 0)
            arr.push(this.namespace);
        arr.push(this.name);
        return arr.join('-');
    };
    var add_namespace = function (str) {
        var parts = str.split('-'), i = parts.length, arr = [];
        while (i--) {
            if (i !== 0) {
                arr.push(parts[i]);
            }
            else {
                if (this.namespace.length > 0) {
                    arr.push(this.namespace, parts[i]);
                }
                else {
                    arr.push(parts[i]);
                }
            }
        }
        return arr.reverse().join('-');
    };
    var bindings = function (method, options) {
        var self = this, should_bind_events = !S(this).data(this.attr_name(true));
        if (S(this.scope).is('[' + this.attr_name() + ']')) {
            S(this.scope).data(this.attr_name(true) + '-init', $.extend({}, this.settings, (options || method), this.data_options(S(this.scope))));
            if (should_bind_events) {
                this.events(this.scope);
            }
        }
        else {
            S('[' + this.attr_name() + ']', this.scope).each(function () {
                var should_bind_events = !S(this).data(self.attr_name(true) + '-init');
                S(this).data(self.attr_name(true) + '-init', $.extend({}, self.settings, (options || method), self.data_options(S(this))));
                if (should_bind_events) {
                    self.events(this);
                }
            });
        }
        if (typeof method === 'string') {
            return this[method].call(this, options);
        }
    };
    var single_image_loaded = function (image, callback) {
        function loaded() {
            callback(image[0]);
        }
        function bindLoad() {
            this.one('load', loaded);
            if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                var src = this.attr('src'), param = src.match(/\?/) ? '&' : '?';
                param += 'random=' + (new Date()).getTime();
                this.attr('src', src + param);
            }
        }
        if (!image.attr('src')) {
            loaded();
            return;
        }
        if (image[0].complete || image[0].readyState === 4) {
            loaded();
        }
        else {
            bindLoad.call(image);
        }
    };
    window.matchMedia = window.matchMedia || (function (doc) {
        var bool, docElem = doc.documentElement, refNode = docElem.firstElementChild || docElem.firstChild, fakeBody = doc.createElement("body"), div = doc.createElement("div");
        div.id = "mq-test-1";
        div.style.cssText = "position:absolute;top:-100em";
        fakeBody.style.background = "none";
        fakeBody.appendChild(div);
        return function (q) {
            div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";
            docElem.insertBefore(fakeBody, refNode);
            bool = div.offsetWidth === 42;
            docElem.removeChild(fakeBody);
            return {
                matches: bool,
                media: q
            };
        };
    }(document));
    (function ($) {
        var animating, lastTime = 0, vendors = ['webkit', 'moz'], requestAnimationFrame = window.requestAnimationFrame, cancelAnimationFrame = window.cancelAnimationFrame, jqueryFxAvailable = 'undefined' !== typeof jQuery.fx;
        for (; lastTime < vendors.length && !requestAnimationFrame; lastTime++) {
            requestAnimationFrame = window[vendors[lastTime] + "RequestAnimationFrame"];
            cancelAnimationFrame = cancelAnimationFrame ||
                window[vendors[lastTime] + "CancelAnimationFrame"] ||
                window[vendors[lastTime] + "CancelRequestAnimationFrame"];
        }
        function raf() {
            if (animating) {
                requestAnimationFrame(raf);
                if (jqueryFxAvailable) {
                    jQuery.fx.tick();
                }
            }
        }
        if (requestAnimationFrame) {
            window.requestAnimationFrame = requestAnimationFrame;
            window.cancelAnimationFrame = cancelAnimationFrame;
            if (jqueryFxAvailable) {
                jQuery.fx.timer = function (timer) {
                    if (timer() && jQuery.timers.push(timer) && !animating) {
                        animating = true;
                        raf();
                    }
                };
                jQuery.fx.stop = function () {
                    animating = false;
                };
            }
        }
        else {
            window.requestAnimationFrame = function (callback) {
                var currTime = new Date().getTime(), timeToCall = Math.max(0, 16 - (currTime - lastTime)), id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }
    }(jQuery));
    function removeQuotes(string) {
        if (typeof string === 'string' || string instanceof String) {
            string = string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, '');
        }
        return string;
    }
    window.Foundation = {
        name: 'Foundation',
        version: '5.4.4',
        media_queries: {
            small: S('.foundation-mq-small').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
            medium: S('.foundation-mq-medium').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
            large: S('.foundation-mq-large').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
            xlarge: S('.foundation-mq-xlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
            xxlarge: S('.foundation-mq-xxlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, '')
        },
        stylesheet: $('<style></style>').appendTo('head')[0].sheet,
        global: {
            namespace: undefined
        },
        init: function (scope, libraries, method, options, response) {
            var args = [scope, method, options, response], responses = [];
            this.rtl = /rtl/i.test(S('html').attr('dir'));
            this.scope = scope || this.scope;
            this.set_namespace();
            if (libraries && typeof libraries === 'string' && !/reflow/i.test(libraries)) {
                if (this.libs.hasOwnProperty(libraries)) {
                    responses.push(this.init_lib(libraries, args));
                }
            }
            else {
                for (var lib in this.libs) {
                    responses.push(this.init_lib(lib, libraries));
                }
            }
            S(window).on("load", function () {
                S(window)
                    .trigger('resize.fndtn.clearing')
                    .trigger('resize.fndtn.dropdown')
                    .trigger('resize.fndtn.equalizer')
                    .trigger('resize.fndtn.interchange')
                    .trigger('resize.fndtn.joyride')
                    .trigger('resize.fndtn.magellan')
                    .trigger('resize.fndtn.topbar')
                    .trigger('resize.fndtn.slider');
            });
            return scope;
        },
        init_lib: function (lib, args) {
            if (this.libs.hasOwnProperty(lib)) {
                this.patch(this.libs[lib]);
                if (args && args.hasOwnProperty(lib)) {
                    if (typeof this.libs[lib].settings !== 'undefined') {
                        $.extend(true, this.libs[lib].settings, args[lib]);
                    }
                    else if (typeof this.libs[lib].defaults !== 'undefined') {
                        $.extend(true, this.libs[lib].defaults, args[lib]);
                    }
                    return this.libs[lib].init.apply(this.libs[lib], [this.scope, args[lib]]);
                }
                args = args instanceof Array ? args : new Array(args);
                return this.libs[lib].init.apply(this.libs[lib], args);
            }
            return function () { };
        },
        patch: function (lib) {
            lib.scope = this.scope;
            lib.namespace = this.global.namespace;
            lib.rtl = this.rtl;
            lib['data_options'] = this.utils.data_options;
            lib['attr_name'] = attr_name;
            lib['add_namespace'] = add_namespace;
            lib['bindings'] = bindings;
            lib['S'] = this.utils.S;
        },
        inherit: function (scope, methods) {
            var methods_arr = methods.split(' '), i = methods_arr.length;
            while (i--) {
                if (this.utils.hasOwnProperty(methods_arr[i])) {
                    scope[methods_arr[i]] = this.utils[methods_arr[i]];
                }
            }
        },
        set_namespace: function () {
            var namespace = (this.global.namespace === undefined) ? $('.foundation-data-attribute-namespace').css('font-family') : this.global.namespace;
            this.global.namespace = (namespace === undefined || /false/i.test(namespace)) ? '' : namespace;
        },
        libs: {},
        utils: {
            S: S,
            throttle: function (func, delay) {
                var timer = null;
                return function () {
                    var context = this, args = arguments;
                    if (timer == null) {
                        timer = setTimeout(function () {
                            func.apply(context, args);
                            timer = null;
                        }, delay);
                    }
                };
            },
            debounce: function (func, delay, immediate) {
                var timeout, result;
                return function () {
                    var context = this, args = arguments;
                    var later = function () {
                        timeout = null;
                        if (!immediate)
                            result = func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, delay);
                    if (callNow)
                        result = func.apply(context, args);
                    return result;
                };
            },
            data_options: function (el, data_attr_name) {
                data_attr_name = data_attr_name || 'options';
                var opts = {}, ii, p, opts_arr, data_options = function (el) {
                    var namespace = Foundation.global.namespace;
                    if (namespace.length > 0) {
                        return el.data(namespace + '-' + data_attr_name);
                    }
                    return el.data(data_attr_name);
                };
                var cached_options = data_options(el);
                if (typeof cached_options === 'object') {
                    return cached_options;
                }
                opts_arr = (cached_options || ':').split(';');
                ii = opts_arr.length;
                function isNumber(o) {
                    return !isNaN(o - 0) && o !== null && o !== "" && o !== false && o !== true;
                }
                function trim(str) {
                    if (typeof str === 'string')
                        return $.trim(str);
                    return str;
                }
                while (ii--) {
                    p = opts_arr[ii].split(':');
                    p = [p[0], p.slice(1).join(':')];
                    if (/true/i.test(p[1]))
                        p[1] = true;
                    if (/false/i.test(p[1]))
                        p[1] = false;
                    if (isNumber(p[1])) {
                        if (p[1].indexOf('.') === -1) {
                            p[1] = parseInt(p[1], 10);
                        }
                        else {
                            p[1] = parseFloat(p[1]);
                        }
                    }
                    if (p.length === 2 && p[0].length > 0) {
                        opts[trim(p[0])] = trim(p[1]);
                    }
                }
                return opts;
            },
            register_media: function (media, media_class) {
                if (Foundation.media_queries[media] === undefined) {
                    $('head').append('<meta class="' + media_class + '"/>');
                    Foundation.media_queries[media] = removeQuotes($('.' + media_class).css('font-family'));
                }
            },
            add_custom_rule: function (rule, media) {
                if (media === undefined && Foundation.stylesheet) {
                    Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length);
                }
                else {
                    var query = Foundation.media_queries[media];
                    if (query !== undefined) {
                        Foundation.stylesheet.insertRule('@media ' +
                            Foundation.media_queries[media] + '{ ' + rule + ' }');
                    }
                }
            },
            image_loaded: function (images, callback) {
                var self = this, unloaded = images.length;
                if (unloaded === 0) {
                    callback(images);
                }
                images.each(function () {
                    single_image_loaded(self.S(this), function () {
                        unloaded -= 1;
                        if (unloaded === 0) {
                            callback(images);
                        }
                    });
                });
            },
            random_str: function () {
                if (!this.fidx)
                    this.fidx = 0;
                this.prefix = this.prefix || [(this.name || 'F'), (+new Date).toString(36)].join('-');
                return this.prefix + (this.fidx++).toString(36);
            }
        }
    };
    $.fn.foundation = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        return this.each(function () {
            Foundation.init.apply(Foundation, [this].concat(args));
            return this;
        });
    };
}(jQuery, window, window.document));
