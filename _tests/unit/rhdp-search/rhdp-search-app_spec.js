"use strict";
/* global RHDPSearchApp */
// Test rhdp-search-app component

describe('Given Search Application', function() {
    var wc;

    beforeEach(function() {
        document.body.insertBefore(document.createElement('rhdp-search-app'), document.body.firstChild);
        wc = document.body.firstChild;
    });

    afterEach(function() {
        document.body.removeChild(document.body.firstChild);
    });

    it('should be true', function() {
        expect(wc.innerText).toEqual('');
    });
});