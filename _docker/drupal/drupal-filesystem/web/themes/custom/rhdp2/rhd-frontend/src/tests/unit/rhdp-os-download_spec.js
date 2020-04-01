"use strict";

describe('OS detection component', function () {
    var productCode,
    productName,
    platformType,
    downloadURL,
    url,
    rhelURL,
    macURL,
    winURL,
    version,
    displayOS,
    wc;

    beforeEach(async () => {
        await System.import('./base/src/docs/static/js/@rhd/rhdp-os-download.js').then(() => {
            wc = document.createElement('rhdp-os-download');
            productName = "Test product";
            rhelURL = "http://www.rhel-url-download.com/";
            macURL = "http://www.mac-url-download.com/";
            winURL ="http://www.win-url-download.com/";
            version = "7.0.0";
            displayOS = "true";
            url = 'https://testdownload.com/products/testproduct/download/';
            downloadURL = 'https://testdownload.com/products/testproduct/download/';
            productCode = 'testproduct';
        });
    });

    afterEach(function () {
        document.body.removeChild(document.body.firstChild);
    });

    describe('properties', function () {

        beforeEach(function () {
            wc.productCode = productCode;
            wc.productName = productName;
            wc.downloadURL = downloadURL;
            wc.url = url;
            wc.rhelURL = rhelURL;
            wc.macURL = macURL;
            wc.winURL = winURL;
            wc.version = version;
            wc.displayOS = displayOS;

        });

        it('should update all properties with appropriate values', function () {

            expect(wc.getAttribute('url')).toEqual(url);
            expect(wc.getAttribute('product-code')).toEqual(productCode);
            expect(wc.getAttribute('download-url')).toEqual(downloadURL);
            expect(wc.getAttribute('rhel-download')).toEqual(rhelURL);
            expect(wc.getAttribute('mac-download')).toEqual(macURL);
            expect(wc.getAttribute('windows-download')).toEqual(winURL);
            expect(wc.getAttribute('name')).toEqual(productName);
            expect(wc.getAttribute('version')).toEqual(version);
            expect(wc.getAttribute('display-os')).toEqual(displayOS);
        });
    });

    describe('logic methods', function () {

        beforeEach(function () {
            wc.url = url;
            wc.productCode = productCode;
            wc.platformType = platformType;
            wc.downloadURL = downloadURL;


        });

        it('should set platformType based on User-Agent', function () {
            document.body.insertBefore(wc, document.body.firstChild);
            var OSName = "Windows";
            if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
            if (navigator.appVersion.indexOf("Linux")!=-1) OSName="RHEL";

            expect(wc.platformType).toEqual(OSName);

        });
        it('should set platformType based on User-Agent', function () {
            document.body.insertBefore(wc, document.body.firstChild);
            var OSName = "Windows";
            if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
            if (navigator.appVersion.indexOf("Linux")!=-1) OSName="RHEL";

            expect(wc.platformType).toEqual(OSName);

        });
        it('should set platform URLs based on product id', function () {
            wc.setOSURL('devsuite')
            expect(wc.rhelURL).toEqual(wc.productDownloads.devsuite.rhelUrl);
            expect(wc.winURL).toEqual(wc.productDownloads.devsuite.windowsUrl);
            expect(wc.macURL).toEqual(wc.productDownloads.devsuite.macUrl);
            wc.setOSURL('cdk')
            expect(wc.rhelURL).toEqual(wc.productDownloads.cdk.rhelUrl);
            expect(wc.winURL).toEqual(wc.productDownloads.cdk.windowsUrl);
            expect(wc.macURL).toEqual(wc.productDownloads.cdk.macUrl);
            wc.setOSURL('test')
            expect(wc.rhelURL).toEqual(wc.downloadURL);
            expect(wc.winURL).toEqual(wc.downloadURL);
            expect(wc.macURL).toEqual(wc.downloadURL);

        });


    });
    describe('with valid data', function () {

        beforeEach(function () {
            wc.productCode = productCode;
            wc.productName = productName;
            wc.downloadURL = downloadURL;
            wc.url = url;
            wc.rhelURL = rhelURL;
            wc.macURL = macURL;
            wc.winURL = winURL;
            wc.version = version;
            wc.displayOS = false;

        });

        it('should update the link with the appropriate download url', function () {
            document.body.insertBefore(wc, document.body.firstChild);
            expect(wc.querySelector('.pf-c-button.pf-m-heavy').href).toEqual(wc.downloadURL);
        });
        it('should display the full name with version and platform', function () {
            document.body.insertBefore(wc, document.body.firstChild);
            expect(wc.querySelector('.version-name').innerText).toEqual(productName + ' ' + version +' for ' + wc.platformType);
        });
        it('should NOT display the platform when platform urls do not exist', function () {
            wc.rhelURL = "";
            wc.macURL = "";
            wc.winURL = "";
            document.body.insertBefore(wc, document.body.firstChild);

            expect(wc.querySelector('.version-name').innerText).toEqual(productName + ' ' + version);
        });
    });


});


