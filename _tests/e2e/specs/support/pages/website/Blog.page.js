const BasePage = require('../Base.page');

class BlogPage extends BasePage {
    constructor() {
        super({
            path: '/blog',
            pageTitle: 'RHD Blog - Insights and news on Red Hat developer tools, platforms and more',
            selector: '.content-teaser-list'
        });
    }
}

module.exports = BlogPage;
