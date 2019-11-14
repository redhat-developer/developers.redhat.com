"use strict";
describe('RHDP Project Url', function() {
    var wc;

    beforeEach(async () => {
        await System.import('./base/src/docs/static/js/@rhd/rhdp-projects/rhdp-project-url.js').then(() => {
            wc = document.createElement('rhdp-project-url');
            document.body.appendChild(wc);
        });
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