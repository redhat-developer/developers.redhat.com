"use strict";
/* global RHDPDownloadsApp */
// Test rhdp-downloads-app component

describe('Given Downloads Application', function() {
    var wc;

    beforeEach(async () => {
        await System.import('./base/src/docs/static/js/@rhd/rhdp-downloads/rhdp-downloads-app.js').then(() => {
            wc = document.createElement('rhdp-downloads-app');
            document.body.insertBefore(wc, document.body.firstChild);
        });
    });

    afterEach(function() {
        document.body.removeChild(document.body.firstChild);
    });

    it('should be true', function() {
        expect(wc.innerText.length).toBeGreaterThan(0);

    });
});