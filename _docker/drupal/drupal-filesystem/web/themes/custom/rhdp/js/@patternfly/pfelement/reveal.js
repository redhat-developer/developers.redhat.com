System.register([], function (exports_1, context_1) {
    "use strict";
    var logger;
    var __moduleName = context_1 && context_1.id;
    function reveal() {
        logger("[reveal] elements ready, revealing the body");
        window.document.body.removeAttribute("unresolved");
    }
    exports_1("reveal", reveal);
    function autoReveal(logFunction) {
        logger = logFunction;
        var polyfillPresent = window.WebComponents;
        var polyfillReady = polyfillPresent && window.WebComponents.ready;
        if (!polyfillPresent || polyfillReady) {
            handleWebComponentsReady();
        }
        else {
            window.addEventListener("WebComponentsReady", handleWebComponentsReady);
        }
    }
    exports_1("autoReveal", autoReveal);
    function handleWebComponentsReady() {
        logger("[reveal] web components ready");
        reveal();
    }
    return {
        setters: [],
        execute: function () {
            logger = function () { return null; };
        }
    };
});
