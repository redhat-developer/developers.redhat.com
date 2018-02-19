import {CheatSheetsPage} from "../support/pages/website/CheatSheets.page";
import {DownloadManager} from "../support/rest/Download.Manager";

const path = require('path');
const fs = require('fs');

const cheatSheetsSteps = function () {

    let cheatSheetPage;
    let downloadName;

    this.Given(/^I am on the promotion page for the "(.*)"$/, function (cheatSheet) {
        cheatSheetPage = new CheatSheetsPage(cheatSheet);
        cheatSheetPage.open();
        cheatSheetPage.awaitLoaded()
    });

    this.When(/^I click on the Log in to Download "(.*)" button/, function (cheatSheet) {
        cheatSheetPage.clickLoginToDownloadBtn();
        let dm = new DownloadManager('https://developers.redhat.com');
        downloadName = dm.getDownloadFor(`Media: ${cheatSheet}`);
    });

    this.When(/^I click on the Download "(.*)" button/, function (cheatSheet) {
        cheatSheetPage.clickDownloadBtn();
        let dm = new DownloadManager('https://developers.redhat.com');
        downloadName = dm.getDownloadFor(`Media: ${cheatSheet}`);
    });

    this.Then(/^the pdf download should initiate$/, function () {
        global.downloadStarted = true;
        let downloadCount = 0;
        let testFolder = path.resolve(global.downloadDir);
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
        while (dirSize.length === 0 && downloadCount < 10);
        assert(dirSize.length === 1, `Expected 1 download, but got ${dirSize.length}`);
    })
};

module.exports = cheatSheetsSteps;