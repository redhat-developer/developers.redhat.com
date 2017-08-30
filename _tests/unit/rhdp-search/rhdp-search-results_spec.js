"use strict";
// Test rhdp-search-results component

describe('Search Results (list)', function() {
    var wc;
    beforeEach(function() {
        document.body.insertBefore(document.createElement('rhdp-search-results'), document.body.firstChild);
        wc = document.body.firstChild;
    });

    afterEach(function() {
        document.body.removeChild(document.body.firstChild);
    });

    it('should have a results object', function() {
        var results = {hits: {hits: []}};
        wc.results = results;
        expect(wc.results).toEqual(results);
    });

});