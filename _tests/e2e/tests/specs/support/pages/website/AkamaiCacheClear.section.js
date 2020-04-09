import Page from '../Page';
import Driver from "../../utils/Driver.Extension";

class AkamaiCacheClear extends Page {

  get mobileToggle() {
      return $('.rhd-c-nav-mobile');
  }

  get akamaiForm() {
    return $('form.akamai-clear-url-form');
  }

  isMobile() {
    super.open('/');
    return Driver.isVisible(this.mobileToggle);
  }

  getForm() {
    return this.akamaiForm;
  }
}

export default new AkamaiCacheClear;
