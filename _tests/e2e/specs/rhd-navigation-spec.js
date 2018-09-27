import {Home} from './support/pages/website/Home.page'
import {NavigationBar} from './support/pages/website/NavigationBar.section'
import {Login} from './support/pages/keycloak/Login.page'

describe('Navigation bar', function () {
    let home, navBar, login;

    beforeEach(function () {
        home = new Home();
        navBar = new NavigationBar();
        login = new Login();
    }, 2);

    it("@sanity : should navigate users to the Keycloak Login page", function () {
        home
            .open('/');
        navBar
            .clickLogin();
        login
            .awaitLogin();
        expect(login.isDisplayed()).to.be.true
    }, 2);
});
