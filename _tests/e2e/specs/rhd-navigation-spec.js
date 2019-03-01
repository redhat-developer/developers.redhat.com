import {Home} from './support/pages/Home.page'
import {NavigationBar} from './support/pages/NavigationBar.section'
import {Login} from './support/pages/Login.page'

describe('Navigation bar', function () {
    this.retries(2);
    let home, navBar, loginPage;

    beforeEach(function () {
        home = new Home();
        navBar = new NavigationBar();
        loginPage = new Login();
    });

    it("should navigate users to the Keycloak Login page", function () {
        home
            .open('/');
        navBar
            .clickLogin();
        loginPage.keycloak.awaitLogin();
        expect(loginPage.keycloak.isDisplayed()).to.be.true
    });
});
