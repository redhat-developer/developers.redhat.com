const HomePage = require('./support/pages/website/Home.page');
const homePage = new HomePage();

const tags = require('mocha-tags');

describe('Home Page', function () {

    tags('sanity').it("homepage should contain an embedded hash string for the nagios health check", function () {
        homePage
            .open('/');
        expect(homePage.getPageSource(),
            'WARNING! Please check the page title! The site export will break, ' +
            'the nagios health check expects 00fef0cf90c42f3e40921fb3370e520a').to.include('00fef0cf90c42f3e40921fb3370e520a')
    });

});
