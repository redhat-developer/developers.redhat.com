import {Home} from './support/pages/website/Home.page';

const tags = require('mocha-tags');

describe('Home Page', function () {

    tags('sanity')
        .it("should contain an embedded hash string for the nagios health check", function () {
            this.retries(2);
            let home = new Home();
            home.open('/');
            expect(home.pageSource()).to.include('00fef0cf90c42f3e40921fb3370e520a');
        });
});
