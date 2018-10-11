"use strict";
describe('RHDP Project Url', function() {
    var wc;

    beforeEach(function() {
        wc = new RHDPProjectURL();
        document.body.appendChild(wc);
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    describe('properties', function() {
        it('should update all attributes', function() {
            var term ='test-term',
                uri = 'http://test-uri.com',
                filter = 'test-filter';
            wc.term = term;
            wc.uri = uri;
            wc.filter = filter;
            expect(wc.term).toEqual(term);
            expect(wc.uri).toEqual(uri);
            expect(wc.filter).toEqual(filter);
        });
    });

});