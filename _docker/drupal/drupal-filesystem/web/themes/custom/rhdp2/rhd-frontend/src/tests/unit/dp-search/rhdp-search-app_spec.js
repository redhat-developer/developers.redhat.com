"use strict";
/* global RHDPSearchApp */
// Test rhdp-search-app component

describe('Given Search Application', function() {
    var wc;

    beforeEach(async () => {
        await System.import('./base/src/docs/static/js/@rhd/rhdp-search/rhdp-search-onebox.js').then(() => {
            wc = document.createElement('rhdp-search-app');
            document.body.insertBefore(wc, document.body.firstChild);
        });
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    it('should be true', function() {
        expect(true).toBe(true);
    });
});