"use strict";
// Test rhdp-downloads-all component

describe('Downloads All Products', function () {
    var wc;
    var products;
    var mockProduct = {
        "products": [{
            "productName": "Red Hat JBoss Data Virtualization",
            "groupHeading": "INTEGRATION AND AUTOMATION",
            "productCode": "datavirt",
            "featured": false,
            "downloadLink": "https://developers.stage.redhat.com/download-manager/content/origin/files/sha256/b4/b466affbcc1740bf2c7c73b60bb6ffa7e1ec844fc08447224ab15aa3bcee3949/jboss-dv-6.3.0-1-installer.jar",
            "description": "A tool that brings operational and analytical insight from data dispersed in various business units, apps, and technologies.",
            "version": "6.3.0",
            "learnMoreLink": "https://developers.redhat.com/products/datavirt/overview/"
        }]
    };


    beforeEach(function () {
        wc = document.createElement('rhdp-downloads-all');
        products = new RHDPDownloadsProducts();
        products.products = mockProduct;

    });

    afterEach(function () {
        document.body.removeChild(document.body.firstChild);
        products = null;
    });

    describe('properties', function () {


        beforeEach(function () {
            wc.id = 'test';
            wc.heading = 'test heading';
            wc.products = products;
            document.body.insertBefore(wc, document.body.firstChild);

        });
        it('should update the id property', function () {
            expect(wc.id).toEqual('test');


        });
        it('should update the heading property', function () {
            expect(wc.heading).toEqual('test heading');


        });
        it('should update productList property', function () {
            expect(wc.products).toEqual(products);


        });

    });
    describe('with valid data', function () {


        beforeEach(function () {
            wc.id = 'test';
            wc.heading = 'test heading';
            wc.products = products;
            document.body.insertBefore(wc, document.body.firstChild);
        });

        it('should have a heading with the appropriate text', function () {
            expect(wc.querySelector('h4').innerText).toEqual('test heading');
        });
        it('should update the id with the appropriate text', function () {
            expect(wc.querySelector('.large-24.category-label').id).toEqual('test');
        });

    });

});