import {BasePage} from "../Base.page";

class HomePage extends BasePage {
    constructor() {
        super({
            path: '/',
            selector: '.home'
        });
    }
}

const homePage = new HomePage();

export {
    homePage
};
