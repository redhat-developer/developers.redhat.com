"use strict";
/* global RHDPDownloadsApp */
// Test rhdp-downloads-app component

describe('Given Downloads Application', function() {
    var wc;

    beforeEach(function() {
        document.body.insertBefore(document.createElement('rhdp-downloads-app'), document.body.firstChild);
        wc = document.body.firstChild;
    });

    afterEach(function() {
        document.body.removeChild(document.body.firstChild);
    });

    it('should be true', function() {
        expect(wc.innerText.length).toBeGreaterThan(0);

    });
});