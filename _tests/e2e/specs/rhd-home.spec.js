import {Home} from './support/pages/website/Home.page';

describe('Home Page', function () {

    it("@sanity : should contain an embedded hash string for the nagios health check", function () {
        this.retries(2);
        let home = new Home();
        home.open('/');
        expect(home.pageSource()).to.include('00fef0cf90c42f3e40921fb3370e520a');
    });
});
