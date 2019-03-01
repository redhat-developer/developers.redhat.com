import {Home} from './support/pages/Home.page'
import {NavigationBar} from './support/pages/NavigationBar.section'
import {Login} from './support/pages/Keycloak.Login.page'

describe('Navigation bar', function () {
    this.retries(2);
    let home, navBar, login;

    beforeEach(function () {
        home = new Home();
        navBar = new NavigationBar();
        login = new Login();
    });

    it("@sanity : should navigate users to the Keycloak Login page", function () {
        home
            .open('/');
        navBar
            .clickLogin();
        login
            .awaitLogin();
        expect(login.isDisplayed()).to.be.true
    });
});
