"use strict";
// Test rhdp-downloads-products component

describe('Download Products', function() {
    var wc;

    beforeEach(async () => {
        await System.import('./base/src/docs/static/js/@rhd/rhdp-downloads/rhdp-downloads-products.js').then(() => {
            wc = document.createElement('rhdp-downloads-products');
            wc.mock = true;
        });
    });

    afterEach(function() {
        document.body.removeChild(document.body.firstChild);
    });

    describe('properties', function() {
        beforeEach(function() {
            document.body.insertBefore(wc, document.body.firstChild);
        });

        it('should update categoryHeading attribute', function() {
            var category = 'Test Product';
            wc.category = category;
            expect(wc.getAttribute('category')).toEqual(category);
        });
        it('should update data attribute', function() {
            var data =
                [
                    {
                        "name": "Test Product",
                        "productCode": "testprod",
                        "featuredArtifact": {
                            "url": "http://www.testproduct.com",
                            "description": "Installer",
                            "label": "Installer",
                            "fileSize": 1001265730,
                            "tcModel": "Test subscription model",
                            "sha256": "ShaTestKey",
                            "md5": "md5TestKey",
                            "versionName": "6.3.0",
                            "releaseDate": 1470801600000,
                            "type": "file"
                        },
                        "productVersions": []
                    }
                ]
            ;
            wc.data = data;
            expect(wc.data).toEqual(data);
        });
        it('should update products attribute', function() {
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
            wc.products = products;
            expect(wc.products).toEqual(products);
        });

    });

    describe('with valid data', function() {
        var mockData;
        var products = {
            "products": [{
                "productName": "Test Product",
                "groupHeading": "Test Group Heading",
                "productCode": "testid",
                "featured": true,
                "dataFallbackUrl": "http://www.testdatafallbackurl.com",
                "downloadLink": "",
                "description": "This is a test of popular products",
                "version": "",
                "learnMoreLink": "http://www.testlearningmore.com"
            }]
        };

        beforeEach(function() {
            mockData =                 [
                {
                    "name": "Test Product",
                    "productCode": "testid",
                    "featuredArtifact": {
                        "url": "http://www.testdownloadlink.com/",
                        "description": "Installer",
                        "label": "Installer",
                        "fileSize": 1001265730,
                        "tcModel": "Test subscription model",
                        "sha256": "ShaTestKey",
                        "md5": "md5TestKey",
                        "versionName": "6.3.0",
                        "releaseDate": 1470801600000,
                        "type": "file"
                    },
                    "productVersions": []
                }
            ];
            wc = document.createElement('rhdp-downloads-products');
            wc.products = products;
            document.body.insertBefore(wc, document.body.firstChild);

        });

        afterEach(function() {
            document.body.removeChild(document.body.firstChild);
        });

        it('should set the products when data is added', function() {
            wc.data = mockData;
            expect(wc.products).toEqual({"products":[{"productName":"Test Product","groupHeading":"Test Group Heading","productCode":"testid","featured":true,"dataFallbackUrl":"http://www.testdatafallbackurl.com","downloadLink":"http://www.testdownloadlink.com/","description":"This is a test of popular products","version":"6.3.0","learnMoreLink":"http://www.testlearningmore.com"}]});
        });


    })

});