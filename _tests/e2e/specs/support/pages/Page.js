import {PageExtension} from "./PageExtension";

export class Page extends PageExtension {

    constructor({
                    path = '/',
                    pageTitle
                } = {}) {
        super();
        this.urlBase = process.env.RHD_BASE_URL;
        this.path = path;
        this.pageTitle = pageTitle;
        this.selectors = {};
    }

    open() {
        const openUrl = `${this.urlBase}${this.path}`;
        let res = this.visit(openUrl);

        if (this.pageTitle) {
            return this.waitForPageTitle(this.pageTitle, 30000);
        }

        this.hideCookieBanner();

        return res;
    }

    addSelectors(selectors) {
        this.selectors = Object.assign(this.selectors, selectors);
    }

    getSelector(selectorName) {
        if (!this.selectors[selectorName]) {
            return console.log(`WARNING: ${selectorName} is not defined as page-object selector!`)
        }
        let selector = '';
        selector += this.selectors[selectorName];
        return selector.trim();
    }
}
