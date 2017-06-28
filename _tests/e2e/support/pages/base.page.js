"use strict";

class BasePage {
    constructor() {
    }

    open(path) {
        browser.url('/' + path);
    }
}
module.exports = BasePage;
