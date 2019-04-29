const conf = require('../../config/wdio.conf.base').config;
import Driver from '../support/utils/Driver.Extension';
import Login from '../support/pages/drupal/Login.page';
import Config from '../support/pages/drupal/Config.page';

describe('Drupal', function() {
    // eslint-disable-next-line no-invalid-this
    this.retries(2);

    afterEach(function() {
        Driver.visit(`${conf.baseUrl}/user/logout`);
    });

    it("should successfully import all Drupal configuration changes", function() {
        Login
            .open()
            .with(process.env.RHD_DRUPAL_ADMIN_USERNAME, process.env.RHD_DRUPAL_ADMIN_PASSWORD);

        Config.open();
        expect(Config.source()).to.include('There are no configuration changes to import');
    });
});
