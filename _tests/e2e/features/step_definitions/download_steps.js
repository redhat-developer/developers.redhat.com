import {DownloadManager} from '../support/rest/Download.Manager';
import {downloadsPage} from '../support/pages/website/Downloads.page';
import {getStartedPage} from '../support/pages/website/GetStarted.page';

const path = require('path');
const fs = require('fs');

const downloadsSteps = function () {

    let productID;

    this.Given(/^I am on the Downloads page$/, function () {
        downloadsPage.open();
    });

    this.Given(/^I am taken to the Downloads page$/, function () {
        downloadsPage.awaitDownloadsPage();
    });

    this.When(/^I click to download "(.*)"$/, function (product) {
        let dm = new DownloadManager(process.env.RHD_BASE_URL);
        let downloadData = dm.featuredDownloadFor(product);
        productID = downloadData[0];
        downloadsPage.clickToDownload(downloadData[2]);
    });

    this.Then(/^a single download should initiate on the (.*) Hello-World overview page$/, function (product) {
        getStartedPage.waitForGetStartedPage(productID);
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

    this.Then(/^I should see a list of products available for download$/, function () {
        let productNames = downloadsPage.drupalProducts()[0];
        console.log(productNames)

    });
};

module.exports = downloadsSteps;
