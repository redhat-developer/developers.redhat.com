"use strict";
/* global RHDPSearchBox */
// Test rhdp-search-box component
describe('Search Box', function() {
    
    var wc;
    
    beforeEach(async () => {
        await System.import('./base/src/docs/static/js/@rhd/rhdp-search/rhdp-search-box.js').then(() => {
            wc = document.createElement('rhdp-search-box');
            document.body.insertBefore(wc, document.body.firstChild);
        });
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });
    
    it('should be true', function() {
        expect(wc.shadowRoot.querySelector('span').innerText).toEqual("SEARCH");
    });

});