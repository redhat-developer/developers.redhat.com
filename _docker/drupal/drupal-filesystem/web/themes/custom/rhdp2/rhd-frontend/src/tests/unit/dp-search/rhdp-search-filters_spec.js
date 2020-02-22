"use strict";
// Test rhdp-search-filters component

describe('Search Filters', function() {
    var wc;
    var facet = {"term":"","facets":[]};

    beforeEach(async () => {
        await System.import('./base/src/docs/static/js/@rhd/rhdp-search/rhdp-search-filters.js').then(() => {
            wc = document.createElement('rhdp-search-filters');
            wc.filters = facet;
            document.body.insertBefore(wc, document.body.firstChild);
        });
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    it('should be true', function() {
        expect(wc.shadowRoot.querySelector('.title').innerText.trim()).toEqual('Filter By'.toUpperCase());
    });
});

