"use strict";
// Query Component Unit Tests
describe('RHDP Project Query Component', function() {
    var wc;

    beforeEach(function() {
        wc = new RHDPProjectQuery();
        wc.mockData = true;
        document.body.appendChild(wc);
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    describe('properties', function() {
        it('should update all attributes', function() {
            var term ='test-term',
                dcpUrl = 'test-url',
                filter = 'test-filter',
                mockData = true,
                data = 'test-data';
            wc.dcpUrl = dcpUrl;
            wc.term = term;
            wc.filter = filter;
            wc.data = data;
            wc.mockData = mockData;
            expect(wc.dcpUrl).toEqual(dcpUrl);
            expect(wc.term).toEqual(term);
            expect(wc.filter).toEqual(filter);
            expect(wc.data).toEqual(data);
            expect(wc.mockData).toEqual(mockData);
        });
    });
    describe('with valid data', function() {
            var term ='test-term',
            filter = 'test-filter',
            dcpUrl = "http://test-url.com";
        beforeEach (function() {
            wc.term = term;
            wc.filter = filter;
            wc.dcpUrl = dcpUrl;

        });

        it('should update all attributes', function() {
            var e = {
                detail: {
                    term: "Test Term",
                    filter: "eap"
                }
            };
            wc._filterChange(e);
            expect(wc.filter).toEqual("eap");
            expect(wc.term).toEqual("Test Term");

        });
    });


});