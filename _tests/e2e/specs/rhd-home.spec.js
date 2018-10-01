import {Home} from './support/pages/website/Home.page';

describe('Home Page', function () {
    this.retries(2);

    it("@sanity : should contain an embedded hash string for the nagios health check", function () {
        let home = new Home();
        home.open('/');
        expect(home.source()).to.include('00fef0cf90c42f3e40921fb3370e520a');
    });
});
