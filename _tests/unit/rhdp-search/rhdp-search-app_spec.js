"use strict";
/* global RHDPSearchApp */
// Test rhdp-search-app component

xdescribe('Given Search Application', function() {
    var wc;
    beforeEach(function() {
        wc = new RHDPSearchApp();
    });

    afterEach(function() {
        document.body.removeChild(document.body.firstChild);
    });

    it('should be true', function() {
        expect(wc.innerText).toEqual('');
    });
});