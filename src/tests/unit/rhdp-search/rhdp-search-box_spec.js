"use strict";
/* global RHDPSearchBox */
// Test rhdp-search-box component
describe('Search Box', function() {
    
    var wc;
    
    beforeEach(function() {
        wc = new RHDPSearchBox();
        document.body.insertBefore(wc, document.body.firstChild);
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });
    
    it('should be true', function() {
        expect(wc.querySelector('span').innerText).toEqual("SEARCH");
    });

});