import {Home} from './support/pages/website/Home.page'
import {NavigationBar} from './support/pages/website/NavigationBar.section'
import {Login} from './support/pages/keycloak/Login.page'

const tags = require('mocha-tags');

describe('Navigation bar', function () {
    let home, navBar, login;

    beforeEach(function () {
        home = new Home();
        navBar = new NavigationBar();
        login = new Login();
    });

    tags('sanity')
        .it("should navigate users to the Keycloak Login page", function () {
            this.retries(2);
            home
                .open('/');
            navBar
                .clickLogin();
            expect(login.isDisplayed()).to.be.true
        });
});
