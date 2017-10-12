"use strict";
// Test rhdp-downloads-popular-products component

describe('Downloads Popular Products', function() {
    var wc;
    beforeEach(function() {
        wc = document.createElement('rhdp-downloads-popular-products');
    });

    afterEach(function() {
        document.body.removeChild(document.body.firstChild);
    });

    describe('properties', function() {

        var product;

        beforeEach(function() {
            document.body.insertBefore(wc, document.body.firstChild);

        });
        afterEach(function() {
            product = null;

        });

        it('should update productList and productList attributes', function() {
            var products = {
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
            wc.products = products;
            expect(wc.products).toEqual(products);
        });

    });

});