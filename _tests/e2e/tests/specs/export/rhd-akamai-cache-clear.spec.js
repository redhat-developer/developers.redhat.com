/**
 * @file
 * Akamai Cache Clear Button spec tests.
 */

import Driver from '../support/utils/Driver.Extension';
import Login from '../support/pages/drupal/Login.page';
import AkamaiCacheClear from '../support/pages/website/AkamaiCacheClear.section';
const config = require('../../config/wdio.conf.base').config;
const baseUrl = config.baseUrl;

describe('Akamai Cache Clear form for authorized users', function () {
  // eslint-disable-next-line no-invalid-this
  this.retries(2);

  before(function () {
    Login
      .open()
      .with(process.env.RHD_DRUPAL_ADMIN_USERNAME, process.env.RHD_DRUPAL_ADMIN_PASSWORD);
  });

  after(function () {
    Driver.visit(baseUrl + '/user/logout');
  });

  it("should be present on the home page", () => {
    if (AkamaiCacheClear.isMobile() === false) {
      Driver.visit(baseUrl + '/');
      expect(AkamaiCacheClear.getForm().isDisplayed()).to.be.true;
    }
  });

  it("should be present on the katacoda course pages", () => {
    if (AkamaiCacheClear.isMobile() === false) {
      Driver.visit(baseUrl + '/courses/spring-boot/');
      expect(AkamaiCacheClear.getForm().isDisplayed()).to.be.true;
    }
  });
});

describe('Akamai Cache Clear form for unauthorized users', function () {
    // eslint-disable-next-line no-invalid-this
    this.retries(1);

    it("should not be present on the home page for unauthorized users", () => {
      if (AkamaiCacheClear.isMobile() === false) {
        Driver.visit(baseUrl + '/');
        expect(AkamaiCacheClear.getForm().isDisplayed()).to.be.false;
      }
    });

    it("should not be present on katacoda course page for unauthorized users", () => {
      if (AkamaiCacheClear.isMobile() === false) {
        Driver.visit(baseUrl + '/courses/spring-boot/');
        expect(AkamaiCacheClear.getForm().isDisplayed()).to.be.false;
      }
    });
});
