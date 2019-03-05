import {Page} from "../Page"
import {Login} from "../keycloak/Login.page"


export class DrupalLogin extends Page {

    constructor() {
        super({
            path: '/user/login/',
            pageTitle: 'Red Hat Developer | Log in',
        });

        this.addSelectors({
            redHatLoginButton: '#edit-openid-connect-client-keycloak-login'
        });
    }

    with(user) {
        this.click(this.getSelector("redHatLoginButton"));
        let kcLogin = new Login();
        return kcLogin.with(user);
    }
}
