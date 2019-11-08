"use strict";
// Test rhdp-search-query component

describe('Search Query', function() {
    var wc;
    beforeEach(async () => {
        await System.import('./base/src/docs/static/js/@rhd/rhdp-search/rhdp-search-query.js').then(() => {
            wc = document.createElement('rhdp-search-query');
            document.body.insertBefore(wc, document.body.firstChild);
        });
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    it('should be true', function() {
        wc.filters = 'filters';
        expect(wc.innerText).toEqual('');
    });
});