"use strict";
// Test rhdp-search-filters component

describe('Search Filters', function() {
    var wc;
    var facet = {"term":"","facets":[]};

    beforeEach(function() {
        wc = new RHDPSearchFilters();
        wc.filters = facet;
        document.body.insertBefore(wc, document.body.firstChild);
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    it('should be true', function() {
        expect(wc.innerText.trim()).toEqual('Show Filters\nFilter By');
    });
});

