"use strict";
// Test rhdp-downloads-popular-products component

describe('Downloads Popular Products', function() {
    var wc;

    var products = {
        "products": [{
            "productName": "Test Product",
            "groupHeading": "Test Group Heading",
            "productCode": "testid",
            "featured": true,
            "dataFallbackUrl": "http://www.testdatafallbackurl.com",
            "downloadLink": "http://www.testdownloadlink.com/",
            "description": "This is a test of popular products",
            "version": "6.3.0",
            "learnMoreLink": "http://www.testlearningmore.com"
        }]
    };

    beforeEach(function() {
        wc = document.createElement('rhdp-downloads-popular-products');
        wc.productList = products;

    });

    afterEach(function() {
        document.body.removeChild(document.body.firstChild);
    });

    describe('properties', function() {

        beforeEach(function() {
            document.body.insertBefore(wc, document.body.firstChild);

        });

        it('should update productList variable', function() {
            expect(wc.productList).toEqual(products);
        });

    });

    describe('with valid data', function() {

        beforeEach(function() {
            document.body.insertBefore(wc, document.body.firstChild);

        });

        it('should display a child node with the appropriate heading', function() {
            expect(wc.querySelector('.large-6.column h4').innerText.trim()).toEqual("Test Product");
        });
        it('should display a child node with the appropriate data-download-id', function() {
            expect(wc.querySelector('.large-6.column a').getAttribute('data-fallback-url')).toEqual("http://www.testdatafallbackurl.com");
        });
        it('should display a child node with the appropriate href', function() {
            expect(wc.querySelector('.large-6.column a').href).toEqual("http://www.testdownloadlink.com/");
        });

    });

});