"use strict";
// Test rhdp-search-results component

describe('Search Results (list)', function() {
    var wc;

    beforeEach(function() {
        wc = new RHDPSearchResults();
        document.body.insertBefore(wc, document.body.firstChild);
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    it('should have a results object', function() {
        var results = {hits: {hits: []}};
        wc.results = results;
        expect(wc.results).toEqual(results);
    });

});