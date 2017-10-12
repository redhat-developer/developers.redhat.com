"use strict";
// Test rhdp-downloads-products component

describe('Download Products', function() {
    var wc;
    beforeEach(function() {
        wc = document.createElement('rhdp-downloads-products');
        wc.mock = true;
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
                        "name": "Data Virtualization",
                        "productCode": "datavirt",
                        "featuredArtifact": {
                            "url": "https://developers.stage.redhat.com/download-manager/content/origin/files/sha256/b4/b466affbcc1740bf2c7c73b60bb6ffa7e1ec844fc08447224ab15aa3bcee3949/jboss-dv-6.3.0-1-installer.jar",
                            "description": "Installer",
                            "label": "Installer",
                            "fileSize": 1001265730,
                            "tcModel": "JBoss/Red Hat Developer Subscription",
                            "sha256": "b466affbcc1740bf2c7c73b60bb6ffa7e1ec844fc08447224ab15aa3bcee3949",
                            "md5": "f88f9106745f913c9e2e158cd28eebf7",
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

    describe('with valid data', function() {
        var mockData;
        var products = {
            "products": [{
                "productName": "Red Hat JBoss Data Virtualization",
                "groupHeading": "INTEGRATION AND AUTOMATION",
                "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=data.services.platform&downloadType=distributions",
                "productCode": "datavirt",
                "featured": false,
                "downloadLink": "https://developers.stage.redhat.com/download-manager/content/origin/files/sha256/b4/b466affbcc1740bf2c7c73b60bb6ffa7e1ec844fc08447224ab15aa3bcee3949/jboss-dv-6.3.0-1-installer.jar",
                "description": "A tool that brings operational and analytical insight from data dispersed in various business units, apps, and technologies.",
                "version": "6.3.0",
                "learnMoreLink": "https://developers.redhat.com/products/datavirt/overview/"
            }]
        };

        beforeEach(function() {
            mockData = [{"name":"Data Virtualization","productCode":"datavirt","featuredArtifact":{"url":"https://developers.stage.redhat.com/download-manager/content/origin/files/sha256/b4/b466affbcc1740bf2c7c73b60bb6ffa7e1ec844fc08447224ab15aa3bcee3949/jboss-dv-6.3.0-1-installer.jar","description":"Installer","label":"Installer","fileSize":1001265730,"tcModel":"JBoss/Red Hat Developer Subscription","sha256":"b466affbcc1740bf2c7c73b60bb6ffa7e1ec844fc08447224ab15aa3bcee3949","md5":"f88f9106745f913c9e2e158cd28eebf7","versionName":"6.3.0","releaseDate":1470801600000,"type":"file"},"productVersions":[]}];
            wc = document.createElement('rhdp-downloads-products');
            wc.products = products;
            document.body.insertBefore(wc, document.body.firstChild);
        });

        afterEach(function() {
            document.body.removeChild(document.body.firstChild);
        });

        it('should set the products when data is added', function() {
            wc.data = mockData;
            expect(wc.products).toEqual({"products":[{"productName":"Red Hat JBoss Data Virtualization","groupHeading":"INTEGRATION AND AUTOMATION","productCode":"datavirt","featured":false,"dataFallbackUrl":"https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=data.services.platform&downloadType=distributions","downloadLink":"https://developers.stage.redhat.com/download-manager/content/origin/files/sha256/b4/b466affbcc1740bf2c7c73b60bb6ffa7e1ec844fc08447224ab15aa3bcee3949/jboss-dv-6.3.0-1-installer.jar","description":"A tool that brings operational and analytical insight from data dispersed in various business units, apps, and technologies.","version":"6.3.0","learnMoreLink":"https://developers.redhat.com/products/datavirt/overview/"}]});
        });


    })

});