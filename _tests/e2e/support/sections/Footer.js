import {BasePage} from "../pages/Base.page";

class FooterSection extends BasePage {

    constructor() {
        super();
    }

    get footer() {
        return browser.element('.bottom')
    }

    footerDropdownItems(i) {
        return browser.element(`//*[@id="collapseFooter"]/div[${i}]/h3`);
    }

    sectionContent(i) {
        return this.textOf(`//*[@id="collapseFooter"]/div[${i}]/div`);
    }

    collapseFooter(i) {
        this.scrollIntoView(this.footer);
        let footerCollapsed = this.isDisplayed(`//*[@id="collapseFooter"]/div[${i}][contains(@class,'collapsed')]`.toString());
        if (footerCollapsed === true) {
            return BasePage.clickOn(this.footerDropdownItems(i));
        }
    }
}

const footerMenu = new FooterSection();

export {
    footerMenu
};
