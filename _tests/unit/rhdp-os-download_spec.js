"use strict";

describe('OS detection component', function () {
    var wc,
        productCode,
        platformType,
        downloadURL,
        url;

    beforeEach(function () {
        wc = document.createElement('rhdp-os-download');
        url = 'https://testdownload.com/products/testproduct/download/';
        platformType = 'MacOS';
        downloadURL = 'https://testdownload.com/products/testproduct/download/';
        productCode = 'testproduct';

    });

    afterEach(function () {
        document.body.removeChild(document.body.firstChild);
    });

    describe('properties', function () {

        beforeEach(function () {
            wc.url = url;
            wc.productCode = productCode;
            wc.platformType = platformType;
            wc.downloadURL = downloadURL;

        });

        it('should update url, productcode, platform-type and downloadurl', function () {
            expect(wc.getAttribute('url')).toEqual(url);
            expect(wc.getAttribute('product-code')).toEqual(productCode);
            expect(wc.getAttribute('platform-type')).toEqual(platformType);
            expect(wc.getAttribute('download-url')).toEqual(downloadURL);
        });
    });
    describe('logic methods', function () {

        beforeEach(function () {
            wc.url = url;
            wc.productCode = productCode;
            wc.platformType = platformType;
            wc.downloadURL = downloadURL;
            document.body.insertBefore(wc, document.body.firstChild);


        });

        it('should extract productCode from getProductFromURL', function () {
            var testValue = wc.getProductFromURL();
            expect(testValue).toEqual(productCode);
        });
        it('should set platformType based on User-Agent', function () {
            var OSName = "Windows";
            if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
            if (navigator.appVersion.indexOf("Linux")!=-1) OSName="RHEL";

            expect(wc.platformType).toEqual(OSName);

        });
    });
    describe('with valid data', function () {

        beforeEach(function () {
            wc.url = url;
            wc.productCode = productCode;
            wc.platformType = platformType;
            wc.downloadURL = downloadURL;
            document.body.insertBefore(wc, document.body.firstChild);


        });

        it('should update url, productcode, platform-type and downloadurl', function () {
            expect(wc.getAttribute('product-code')).toEqual(productCode);
        });
    });

});


