import {Login} from '../support/pages/drupal/Login.page';
import {Home} from '../support/pages/drupal/Home.page';
import {Page} from "../support/pages/Page";

describe('Drupal Login Page', function () {
    this.retries(2);

    afterEach(function () {
        let page = new Page();
        page.visit(`${process.env.RHD_BASE_URL}/user/logout`)
    });

    it("@drupal : should allow an admin to successfully log in to their account", function () {
        let login = new Login();
        let home = new Home();
        login.open();
        login.with(process.env.RHD_DRUPAL_ADMIN_USERNAME, process.env.RHD_DRUPAL_ADMIN_PASSWORD);
        expect(home.loggedInUser()).to.include('automated-tests-user');
    });
});
