import {BasePage} from "../pages/Base.page";
import {driver} from "../../../config/browsers/DriverHelper";

class FooterSection extends BasePage {

    constructor() {
        super();
    }

    footerDropdownItems(i) {
        return driver.element(`//*[@id="collapseFooter"]/div[${i}]//*[@class='toggle-icon']`);
    }

    sectionContent(i) {
        return driver.textOf(`//*[@id="collapseFooter"]/div[${i}]/div`);
    }

    collapseFooter(i) {
        let footer = `//*[@id="collapseFooter"]/div[${i}][contains(@class,'collapsed')]`.toString();
        let footerCollapsed = driver.awaitExists(footer);
        if (footerCollapsed === true) {
            return driver.clickOn(this.footerDropdownItems(i));
            // Give it 1 second for the dropdown to open
            browser.pause(1000)
        }
    }
}

const footerMenu = new FooterSection();

export {
    footerMenu
};
