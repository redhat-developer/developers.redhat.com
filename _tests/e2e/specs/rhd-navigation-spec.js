import {Home} from './support/pages/website/Home.page'
import {NavigationBar} from './support/pages/website/NavigationBar.section'
import {Login} from './support/pages/keycloak/Login.page'

describe('Navigation bar', function () {
    let home, navBar, login;

    beforeEach(function () {
        home = new Home();
        navBar = new NavigationBar();
        login = new Login();
    });

    it("tags: @sanity : should navigate users to the Keycloak Login page", function () {
        this.retries(2);
        home
            .open('/');
        navBar
            .clickLogin();
        login
            .awaitLogin();
        expect(login.isDisplayed()).to.be.true
    });
});
