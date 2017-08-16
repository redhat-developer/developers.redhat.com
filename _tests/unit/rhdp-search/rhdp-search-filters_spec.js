"use strict";
// Test rhdp-search-filters component

describe('Search Filters', function() {
    var wc;

    var facet = {"term":"","facets":[]};

    beforeEach(function() {
        wc = document.createElement('rhdp-search-filters')
        wc.filters = facet;
        document.body.insertBefore(wc, document.body.firstChild);
        wc = document.body.firstChild;
    });

    afterEach(function() {
        document.body.removeChild(document.body.firstChild);
    });

    it('should be true', function() {
        expect(wc.innerText.trim()).toEqual('Show Filters\nFilter By');
    });
});

