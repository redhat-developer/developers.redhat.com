import {DownloadManager} from '../support/rest/Download.Manager';
import {downloadsPage} from '../support/pages/website/Downloads.page';
import {GetStartedPage} from '../support/pages/website/GetStarted.page';
const path = require('path');
const fs = require('fs');

const downloadsSteps = function () {

     global.productCode = "";

    this.Given(/^I am on the Downloads page$/, function () {
        downloadsPage.open();
        downloadsPage.awaitDownloadsPage()
    });

    this.Given(/^I am taken to the Downloads page$/, function () {
        downloadsPage.awaitDownloadsPage();
    });

    this.Then(/^I should see "([^"]*)" download field should contain version and operating system$/, function (product) {
        let dm = new DownloadManager(process.env.RHD_BASE_URL);
        let downloadData = dm.featuredDownloadFor(product);
        let expectedDlVersion = `Version: ${downloadData[1]} for ${operatingSystem}`.toLowerCase();
        let actualDlVersion = downloadsPage.osSpecificDownload(downloadData[0]).toLowerCase();
        expect(expectedDlVersion).to.equal(actualDlVersion)
    });

    this.When(/^I click to download "(.*)"$/, function (product) {
        let dm = new DownloadManager(process.env.RHD_BASE_URL);
        let downloadData = dm.featuredDownloadFor(product);
        productCode = downloadData[0];
        downloadsPage.clickToDownload(product, downloadData[2]);
    });

    this.Then(/^a single download should initiate on the (.*) Hello-World overview page$/, function (product) {
        let getStartedPage = new GetStartedPage(productCode);
        getStartedPage.waitForGetStartedPage();
        global.downloadStarted = true;

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
