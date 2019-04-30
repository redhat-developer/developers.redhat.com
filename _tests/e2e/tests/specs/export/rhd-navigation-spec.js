import Home from '../support/pages/website/Home.page';
import NavigationBar from '../support/pages/website/NavigationBar.section';
import Login from '../support/pages/keycloak/Login.page';

describe('Navigation bar', function() {
    // eslint-disable-next-line no-invalid-this
    this.retries(1);

    it("should navigate users to the Keycloak Login page", () => {
        Home.open('/');
        NavigationBar.login();
        expect(Login.isCurrent()).to.be.true;
    });
});
