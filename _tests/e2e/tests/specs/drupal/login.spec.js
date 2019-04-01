const config = require('../../config/wdio.conf.base').config;
import Driver from '../support/utils/Driver.Extension';
import Login from '../support/pages/drupal/Login.page';
import Home from '../support/pages/drupal/Home.page';

describe('Drupal Login Page', function() {
    // eslint-disable-next-line no-invalid-this
    this.retries(2);

    afterEach(function() {
        Driver.visit(`${config.baseUrl}/user/logout`);
    });

    it("should allow an admin to successfully log in to their account", () => {
        Login
            .open()
            .with(process.env.RHD_DRUPAL_ADMIN_USERNAME, process.env.RHD_DRUPAL_ADMIN_PASSWORD);
        expect(Home.loggedInUser()).to.include('automated-tests-user');
    });
});
