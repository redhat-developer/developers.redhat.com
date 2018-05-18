const HomePage = require('./support/pages/website/Home.page');
const homePage = new HomePage();

describe('Home Page', function () {

    tags('sanity').it("health check: homepage should contain <title>Red Hat Developer", function () {
        homePage
            .open('/');
        expect(homePage.getPageSource(),
            'WARNING! Please check the page title! The site export will break, ' +
            'the nagios health check expects <title>Red Hat Developer').to.include('<title>Red Hat Developer')
    });

});
