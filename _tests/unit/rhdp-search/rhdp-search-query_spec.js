"use strict";
// Test rhdp-search-query component

describe('Search Query', function() {
    var wc;
    beforeEach(function() {
        wc = new RHDPSearchQuery();
        document.body.insertBefore(wc, document.body.firstChild);
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    it('should be true', function() {
        wc.filters = 'filters';
        expect(wc.innerText).toEqual('');
    });
});