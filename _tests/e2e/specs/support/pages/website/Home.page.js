const BasePage = require('../Base.page');

class HomePage extends BasePage {
    constructor() {
        super({
            path: '/',
            pageTitle: 'Red Hat Developer',
            selector: '.content-teaser-list'
        });
    }
}

module.exports = HomePage;
