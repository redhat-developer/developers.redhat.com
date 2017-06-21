"use strict";
// Test rhdp-search-filters component

xdescribe('Search Filters', function() {
    var wc;
    beforeEach(function() {
        document.body.insertBefore(document.createElement('rhdp-search-filters'), document.body.firstChild);
        wc = document.body.firstChild;
    });

    afterEach(function() {
        document.body.removeChild(document.body.firstChild);
    });

    it('should be true', function() {
        expect(wc.innerText).toEqual('');
    });
});