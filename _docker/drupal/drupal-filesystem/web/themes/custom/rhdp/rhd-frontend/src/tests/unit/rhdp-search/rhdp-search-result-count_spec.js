"use strict";
// Test rhdp-search-result-count component

describe('Search Result Count', function() {
    var wc;
    beforeEach(function() {
        wc = new RHDPSearchResultCount(); 
        document.body.insertBefore(wc, document.body.firstChild);
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    it('should be blank with no values', function() {
        expect(wc.innerText).toEqual('');
    });
    it('should not have a term with only a count', function() {
        wc.count =  10;
        expect(wc.innerText).toEqual('10 results found');
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