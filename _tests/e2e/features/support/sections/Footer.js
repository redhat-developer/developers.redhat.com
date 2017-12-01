import {BasePage} from "../pages/Base.page";
import {driver} from "../../../config/browsers/DriverHelper";

class FooterSection extends BasePage {

    constructor() {
        super();
        this.addSelectors({
            footer: '#collapseFooter'
        });
    }

    scrollToFooter() {
        return driver.scrollIntoView(this.getSelector('footer'))
    }

    footerDropdownItems(i) {
        return driver.element(`//*[@id="collapseFooter"]/div[${i}]//*[@class='toggle-icon']`);
    }

    sectionContent(i) {
        return driver.textOf(`//*[@id="collapseFooter"]/div[${i}]/div`);
    }

    collapseFooter(i) {
        return driver.clickOn(this.footerDropdownItems(i));
    }
}

const footerMenu = new FooterSection();

export {
    footerMenu
};
