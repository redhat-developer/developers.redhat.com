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

    this.Then(/^I should see "(.*)" download field should contain version and operating system$/, function (product) {
        let dm = new DownloadManager(process.env.RHD_BASE_URL);
        let downloadData = dm.featuredDownloadFor(product);
        let expectedDlVersion = `Version: ${downloadData[1]} for ${operatingSystem}`.toLowerCase();
        let actualDlVersion = downloadsPage.osSpecificDownload(downloadData[0]).toLowerCase();
        expect(actualDlVersion).to.equal(expectedDlVersion)
    });

    this.When(/^I click to download "(.*)"$/, function (product) {
        downloadsPage.clickToDownload(product)
    });

    this.Then(/^I should see the "(.*)" Hello\-World overview page$/, function (productCode) {
        let getStartedPage = new GetStartedPage(productCode);
        getStartedPage.awaitGetStartedPage();
    });

    this.Then(/^a single download should initiate$/, function () {
        global.downloadStarted = true;
        let downloadCount = 0;
        let testFolder = path.resolve('tmp/chromeDownloads');

        let fileName = [];
        let dirSize = [];
        do {
            fs.readdirSync(testFolder).forEach(file => {
                console.log('waiting for download . . . ');
                sleep(1000);
                fileName.push(file);
                dirSize.push(file);
                downloadCount++;
            });
        }
        while (dirSize.length === 0 && downloadCount < 60);
        browser.pause(3000);
        assert(dirSize.length === 1, `Expected 1 download, but got ${dirSize.length}`);
    });

    function sleep(delay) {
        let start = new Date().getTime();
        while (new Date().getTime() < start + delay) ;
    }

};

module.exports = downloadsSteps;
