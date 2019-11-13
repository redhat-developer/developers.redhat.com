"use strict";
// Test rhdp-search-result-count component

describe('Search Result Count', function() {
    var wc;
    beforeEach(async () => {
        await System.import('./base/src/docs/static/js/@rhd/rhdp-search/rhdp-search-result-count.js').then(() => {
            wc = document.createElement('rhdp-search-result-count');
            document.body.insertBefore(wc, document.body.firstChild);
        });
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    it('should be blank with no values', function() {
        expect(wc.shadowRoot.textContent.trim()).toEqual('');
    });
    it('should not have a term with only a count', function() {
        wc.count =  10;
        expect(wc.shadowRoot.querySelector('span').innerText.trim()).toEqual('10 results found');
    });
    it('should be 0 results with only a term value', function() {
        wc.term = 'Fuse';
        expect(wc.shadowRoot.querySelector('span').innerText.trim()).toEqual('0 results found for Fuse');
    });
    it('should say the right thing with a count and term set', function() {
        wc.count = 10;
        wc.term = 'Fuse';
        expect(wc.shadowRoot.querySelector('span').innerText.trim()).toEqual('10 results found for Fuse');
    });
});