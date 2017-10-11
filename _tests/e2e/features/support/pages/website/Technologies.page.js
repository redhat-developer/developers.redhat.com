import {BasePage} from '../Base.page';
import {driver} from "../../../../config/browsers/DriverHelper";
import {DrupalInstance} from "../../rest/Drupal.instance";

class TechnologiesPage extends BasePage {

    constructor() {
        super({
            path: '/products/',
            selector: '.products',
        });
    }

    drupalProducts() {
        let drupal = new DrupalInstance();
        let productName = drupal.getProducts()[0];
        let productCode = drupal.getProducts()[1];
        return [productName, productCode]
    }

    productHeading(productId) {
        return driver.element(`#${productId}`);
    }

    getStartedButton(productId) {
        return driver.element(`#get-started-with-${productId}`)
    }

}

const technologiesPage = new TechnologiesPage();

export {
    technologiesPage
};
