import Page from '../support/pages/Page.page';
import AkamaiCacheClearButton from '../support/pages/website/AkamaiCacheClearButton.section';
import NavigationBar from '../support/pages/website/NavigationBar.section';
import Login from '../support/pages/keycloak/Login.page';

describe('Akamai Cache Clear button', function () {
    // eslint-disable-next-line no-invalid-this
    this.retries(1);

    it("should contain akamai cache clear button on the home page for authorized users", () => {
        Page.open('/');
        expect(AkamaiCacheClearButton.hasButton()).to.be.true;
    });

    // it("should not contain akamai cache clear button on the page for unauthorized users", () => {
    //     Page.open('/');
    //     expect(AkamaiCacheClearButton.hasButton()).to.be.false;
    // });
});
