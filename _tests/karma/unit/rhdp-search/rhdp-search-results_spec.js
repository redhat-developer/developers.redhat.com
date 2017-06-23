"use strict";
// Test rhdp-search-results component

xdescribe('Search Results (list)', function() {
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
        wc.set('results', results);
        expect(wc.results).toEqual(results);
    });

    it('should have named slots (top and bottom)', function() {
        var slots = wc.shadowRoot.querySelectorAll('slot');
        expect(slots[0].name).toEqual('top');
        expect(slots[2].name).toEqual('bottom');
    });
});