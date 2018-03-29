"use strict";
describe('RHDP Project Filter Box Component', function() {
    var wc;

    beforeEach(function() {
        wc = new RHDPProjectFilterBox();
        document.body.appendChild(wc);
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    describe('properties', function() {
        it('should update all attributes', function() {
            var term ='test-term',
                filter = 'test-filter';
            wc.term = term;
            wc.filter = filter;
            expect(wc.term).toEqual(term);
            expect(wc.filter).toEqual(filter);
        });
    });
    describe('with valid data', function() {
        var term ='test-term',
            filter = 'amq';

        beforeEach (function() {
            wc.term = term;
            wc.filter = filter;

        });

        it('should update the term when changed', function() {
            var changedTerm = 'test-version-2';
            wc.term = changedTerm;
            expect(wc.querySelector('input').value).toEqual(wc.term);
        });
    });


});