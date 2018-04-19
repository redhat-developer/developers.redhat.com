const BasePage = require('../../../Base.page');

class SearchOneBox extends BasePage {
    constructor() {
        super();

        this.addSelectors(
            {
                oneBoxTitle: '//rhdp-search-onebox//h4/a',
                helloWorldLink: "//rhdp-search-onebox//a[text()='Hello World!']",
                docsAndAPIsLink: "//rhdp-search-onebox//a[text()='Docs and APIs']",
                helpLink: "//rhdp-search-onebox//a[text()='Help']",
                viewDownloadsButton: "//rhdp-search-onebox//a[text()='View Downloads']",
            });
    }

    getOneBoxTitle() {
        return this.textOf(this.getSelector('oneBoxTitle'))
    }

    getOneBoxElement(element) {
        let el = `${element.charAt(0).toLowerCase() + element.slice(1).replace(/\s/g, '')}`.toString();
        return this.element(this.getSelector(el));
    }

}

module.exports = SearchOneBox;