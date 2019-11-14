"use strict";
// Test rhdp-downloads-popular-product component

describe('Downloads Popular Product Item', function() {
    var wc;
    beforeEach(async () => {
        await System.import('./base/src/docs/static/js/@rhd/rhdp-downloads/rhdp-downloads-popular-product.js').then(() => {
            wc = document.createElement('rhdp-downloads-popular-product');
        });
    });

    afterEach(function() {
        document.body.removeChild(document.body.firstChild);
    });

    describe('properties', function() {

        beforeEach(function() {
            wc.name = "Test Name";
            wc.productId = "testproduct";
            wc.dataFallbackUrl = "http://www.testproduct.com";
            wc.downloadUrl = "http://www.downloadtestproduct.com";

            document.body.insertBefore(wc, document.body.firstChild);

        });

        it('should update productList and productList attributes', function() {
            expect(wc.name).toEqual("Test Name");
        });
        it('should update productList and productList attributes', function() {
            expect(wc.productId).toEqual("testproduct");
        });
        it('should update productList and productList attributes', function() {
            expect(wc.dataFallbackUrl).toEqual("http://www.testproduct.com");
        });
        it('should update productList and productList attributes', function() {
            expect(wc.downloadUrl).toEqual('http://www.downloadtestproduct.com');
        });

    });
    describe('with valid data', function() {

        beforeEach(function() {
            wc.name = "Test Name";
            wc.productId = "testproduct";
            wc.dataFallbackUrl = "http://www.testproduct.com";
            wc.downloadUrl = "http://www.downloadtestproduct.com";

            document.body.insertBefore(wc, document.body.firstChild);

        });
        it('should update the osVersion', function () {

            wc.osVersionExtract('');
            expect(wc.downloadUrl).toEqual('http://www.downloadtestproduct.com');

        });

        it('should update the heading with the appropriate name', function() {
            expect(wc.querySelector('.popular-download-box h4').innerText.trim()).toEqual('Test Name');
        });
        it('should update the data-download-id attribute with the appropriate id', function() {
            expect(wc.querySelector('.popular-download-box a').getAttribute('data-download-id')).toEqual("testproduct");
        });
        it('should update the data-fallback-url attribute with the appropriate url', function() {
            expect(wc.querySelector('.popular-download-box a').getAttribute('data-fallback-url')).toEqual("http://www.testproduct.com");
        });
        it('should update the href attribute with the proper download url', function() {
            expect(wc.querySelector('.popular-download-box a').href).toEqual('http://www.downloadtestproduct.com/');
        });

    });

});