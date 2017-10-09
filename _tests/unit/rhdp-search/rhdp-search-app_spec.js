"use strict";
/* global RHDPSearchApp */
// Test rhdp-search-app component

xdescribe('Given Search Application', function() {
    var wc;

    beforeEach(function() {
        wc = new RHDPSearchApp();
        document.body.insertBefore(wc, document.body.firstChild);
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    it('should be true', function() {
        expect(true).toBe(true);
    });
});