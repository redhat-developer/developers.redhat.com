import {Page} from "../support/pages/Page";

const qs = require('querystring');

export class Utils extends Page {

    cleanSession(baseUrl) {
        let logoutLink;
        let encodedURL = qs.escape(baseUrl);
        if (process.env.RHD_BASE_URL === 'https://developers.stage.redhat.com') {
            logoutLink = `https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`
        } else {
            logoutLink = `https://developers.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`
        }
        return this.visit(logoutLink);
    }

    logout() {
        try {
            return this.userLogout()
        } catch (e) {
            return this.cleanSession(process.env.RHD_BASE_URL)
        }
    }
}
