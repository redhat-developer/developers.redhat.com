"use strict";
// Test rhdp-downloads-all component

describe('Downloads All Products', function () {
    var wc;
    var products;
    var mockProduct = {
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

    beforeEach(async () => {
        await System.import('./base/src/docs/static/js/@rhd/rhdp-downloads/rhdp-downloads-all.js').then(() => {
            System.import('./base/src/docs/static/js/@rhd/rhdp-downloads/rhdp-downloads-products.js').then(() => {
                wc = document.createElement('rhdp-downloads-all');
                products = document.createElement('rhdp-downloads-products');
                products.products = mockProduct;
            });
        });
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

        describe('and product category headings', function () {


            beforeEach(function () {
                wc.id = 'test';
                wc.heading = 'Test Group Heading';
                wc.products = products;
                document.body.insertBefore(wc, document.body.firstChild);

            });
            it('should have a download list class to append children to', function () {
                expect(wc.querySelector('.download-list').innerText.length).toBeGreaterThan(0);

            });
            it('should have a rhdp-downloads-all-item child appended', function () {
                expect(wc.querySelector('rhdp-downloads-all-item').innerText.length).toBeGreaterThan(0);

            });
            it('should have a rhdp-downloads-all-item child appended with a heading', function () {
                expect(wc.querySelector('rhdp-downloads-all-item .row .large-24.column h5').innerText.trim()).toEqual("Test Product");

            });
            it('should have a rhdp-downloads-all-item child appended with a description', function () {
                expect(wc.querySelector('rhdp-downloads-all-item .row .paragraph p').innerText.trim()).toEqual("This is a test of popular products");

            });
            it('should have a rhdp-downloads-all-item child appended with a learn more link', function () {
                expect(wc.querySelector('rhdp-downloads-all-item .row .large-10.columns a').href).toEqual("http://www.testlearningmore.com/");

            });
            it('should have a rhdp-downloads-all-item child appended with a data-download-id-version', function () {
                expect(wc.querySelector('rhdp-downloads-all-item .row .large-9.center.columns p').getAttribute('data-download-id-version')).toEqual("testid");

            });
            it('should have a rhdp-downloads-all-item child appended with a version', function () {
                expect(wc.querySelector('rhdp-downloads-all-item .row .large-9.center.columns p').innerText.trim()).toEqual("Version: 6.3.0");

            });
            it('should have a rhdp-downloads-all-item child appended pf-c-button pf-m-secondary with appropriate data', function () {
                expect(wc.querySelector('rhdp-downloads-all-item .row a.pf-c-button.pf-m-secondary').getAttribute('data-download-id')).toEqual("testid");
                expect(wc.querySelector('rhdp-downloads-all-item .row a.pf-c-button.pf-m-secondary').getAttribute('data-fallback-url')).toEqual("http://www.testdatafallbackurl.com");
                expect(wc.querySelector('rhdp-downloads-all-item .row a.pf-c-button.pf-m-secondary').href).toEqual("http://www.testdownloadlink.com/");

            });

        });



    });

});