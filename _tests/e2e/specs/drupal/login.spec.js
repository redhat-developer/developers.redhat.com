import {DrupalLogin} from '../support/pages/drupal/Drupal-login.page';
import {Home} from '../support/pages/drupal/Home.page';
import {Page} from "../support/pages/Page";

describe('Drupal Login Page', function () {
    this.retries(2);

    afterEach(function () {
        let page = new Page();
        page.visit(`${process.env.RHD_BASE_URL}/user/logout`)
    });

    it("@drupal : should allow an admin to successfully log in to their account", function () {
        let login = new DrupalLogin();
        let home = new Home();
        let user = {
            email: process.env.RHD_DRUPAL_ADMIN_USERNAME,
            password: process.env.RHD_DRUPAL_ADMIN_PASSWORD,
        };
        login.open();
        login.with(user);
        expect(home.isAdminLoggedIn()).to.be.true;
    });
});
