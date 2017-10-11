let mixin = require("xmultiple");
let BasePage = require("./Base.page");
let NavigationBar = require('../sections/navigationBar.section');

class DownloadsPage extends mixin(BasePage, NavigationBar) {
    open() {
        super.open('downloads');
        browser.waitForVisible('.downloads');
        let loading = $('#downloads .fa-refresh');
        loading.waitForVisible(10000, true)
    }

    clickToDownload(url) {
        let downloadBtn = $(`//a[@href='${url}']`);
        let location = browser.getLocationInView(`//a[@href='${url}']`);
        downloadBtn.scroll(location['x'], location['y']);
        downloadBtn.click()
    }
}

module.exports = DownloadsPage;
