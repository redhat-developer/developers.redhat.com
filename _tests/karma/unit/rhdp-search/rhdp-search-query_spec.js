"use strict";
// Test rhdp-search-query component

xdescribe('Search Query', function() {
    var wc;
    beforeEach(function() {
        document.body.insertBefore(document.createElement('rhdp-search-query'), document.body.firstChild);
        wc = document.body.firstChild;
    });

    afterEach(function() {
        document.body.removeChild(document.body.firstChild);
    });

    it('should be true', function() {
        wc.set('filters', {term: 'Foo'});
        expect(wc.innerText).toEqual('');
    });
});