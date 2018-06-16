const SearchPage = require('./support/pages/website/Search.page');
const searchPage = new SearchPage();

const tags = require('mocha-tags');

describe('Red Hat Blog Page', function () {

    tags('sanity').it("should contain an embedded hash string for the nagios health check", function () {
        searchPage
            .open('/');
        expect(searchPage.getPageSource(),
            'WARNING! Please check the page title! The site export will break, ' +
            'the nagios health check expects 00fef0cf90c42f3e40921fb3370e520a').to.include('00fef0cf90c42f3e40921fb3370e520a')
    });

});
