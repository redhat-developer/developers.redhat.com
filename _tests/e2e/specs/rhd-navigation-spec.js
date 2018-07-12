// const Home = require('./support/pages/website/Home.page');
// const SiteNav = require('./support/pages/website/NavigationBar.section');
// const Login = require('./support/pages/keycloak/Login.page');
//
// const home = new Home();
// const siteNav = new SiteNav();
// const login = new Login();
//
// const tags = require('mocha-tags');
//
// describe('Navigation bar', function () {
//
//     tags('sanity')
//         .it("should navigate users to the Keycloak Login page", function () {
//             this.retries(2);
//             home
//                 .open('/');
//             siteNav
//                 .clickLogin();
//             expect(login.isDisplayed()).to.be.true
//         });
// });
