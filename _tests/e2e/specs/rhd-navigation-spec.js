const HomePage = require('./support/pages/website/Home.page');
const SiteNav = require('./support/pages/website/NavigationBar.section');
const LoginPage = require('./support/pages/keycloak/Login.page');

const homePage = new HomePage();
const siteNav = new SiteNav();
const loginPage = new LoginPage();

describe('Navigation bar', function () {

    tags('wip').it("should navigate users to the Keycloak Login page", function () {
        homePage
            .open('/');
        siteNav
            .clickLoginLink();
        expect(loginPage
            .isOnLoginPage(), 'Log in page was not displayed').to.eq(true)
    });

});
