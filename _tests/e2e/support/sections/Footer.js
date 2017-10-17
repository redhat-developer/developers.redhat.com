import {BasePage} from "../pages/Base.page";

class FooterSection extends BasePage {

    constructor() {
        super();
    }

    footerDropdownItems(i) {
        return browser.element(`//*[@id="collapseFooter"]/div[${i}]/h3`);
    }

    sectionContent(i) {
        return this.textOf(`//*[@id="collapseFooter"]/div[${i}]/div`);
    }

    collapseFooter(i) {
        let footerCollapsed = this.isDisplayed(`//*[@id="collapseFooter"]/div[${i}][contains(@class,'collapsed')]`.toString());
        if (footerCollapsed === true) {
            return this.clickOn(this.footerDropdownItems(i));
        }
    }
}

const footerMenu = new FooterSection();

export {
    footerMenu
};
