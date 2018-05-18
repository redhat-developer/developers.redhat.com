const HomePage = require('./support/pages/website/Home.page');
const SiteNav = require('./support/pages/website/NavigationBar.section');
const LoginPage = require('./support/pages/keycloak/Login.page');

const homePage = new HomePage();
const siteNav = new SiteNav();
const loginPage = new LoginPage();

describe('Navigation bar', function () {

    tags('sanity').it("should navigate users to the Keycloak Login page", function () {
        this.retries(2);
        homePage
            .open('/');
        siteNav
            .clickLoginLink();
        expect(loginPage.isOnLoginPage(), 'Log in page was not displayed').to.be.true
    });

    afterEach(function () {
        if (this.currentTest.state === 'failed') {
            global.logger.warn(`Login page was not accessible!`)
        }
    });

});
