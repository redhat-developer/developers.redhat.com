const DownloadManager = require("../support/rest/Download.Manager");
const DownloadsPage = require("../support/pages/Downloads.page");
const GetStartedPage = require("../support/pages/GetStarted.page");
const downloadsPage = new DownloadsPage;
const getStartedPage = new GetStartedPage;
const faker = require('faker');
const path = require('path');
const fs = require('fs');

const downloadsSteps = function () {

    let productID;

    this.Given(/^I am on the Downloads page$/, function () {
        downloadsPage.open();
    });

    this.When(/^I click to download "(.*)"$/, function (product) {
        let dm = new DownloadManager(baseUrl);
        let downloadData = dm.featuredDownloadFor(product);
        productID = downloadData[0];
        downloadsPage.clickToDownload(downloadData[2]);
    });

    this.Then(/^a single download should initiate on the (.*) Hello-World overview page$/, function () {
        getStartedPage.waitForGetStartedPage(productID);

        let downloadCount = 0;
        let testFolder = path.resolve('tmp/chromeDownloads');
        let fileName = [];
        let dirSize = [];
        do {
            fs.readdirSync(testFolder).forEach(file => {
                console.log('waiting for download . . . ');
                fileName.push(file);
                dirSize.push(file);
                downloadCount++;
            });
        }
        while (dirSize.length === 0 && downloadCount < 60);

        assert(dirSize.length === 1, `Expected 1 download, but got ${dirSize.length}`);
        assert(fileName[0].includes('crdownload'), `${fileName[0]} did not include 'crdownload'`)

    });
};

module.exports = downloadsSteps;
