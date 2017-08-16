"use strict";
// Test rhdp-search-result-count component

describe('Search Result Count', function() {
    var wc;
    beforeEach(function() {
        document.body.insertBefore(document.createElement('rhdp-search-result-count'), document.body.firstChild);
        wc = document.body.firstChild;
    });

    afterEach(function() {
        document.body.removeChild(document.body.firstChild);
    });

    it('should be blank with no values', function() {
        expect(wc.innerText).toEqual('');
    });
    it('should be blank with only a count value', function() {
        wc.count =  10;
        expect(wc.innerText).toEqual('');
    });
    it('should be 0 results with only a term value', function() {
        wc.term = 'Fuse';
        expect(wc.innerText).toEqual('0 results found for Fuse');
    });
    it('should say the right thing with a count and term set', function() {
        wc.count = 10;
        wc.term = 'Fuse';
        expect(wc.innerText).toEqual('10 results found for Fuse');
    });
});