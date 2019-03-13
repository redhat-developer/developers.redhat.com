import {Page} from "../support/pages/Page";

const qs = require('querystring');

export class Utils extends Page {

    cleanSession() {
        let logoutLink;
        let baseUrl = process.env.RHD_BASE_URL;
        let encodedURL = qs.escape(baseUrl);
        if (baseUrl === 'https://developers.stage.redhat.com') {
            logoutLink = `https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`
        } else {
            logoutLink = `https://developers.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`
        }
        return this.visit(logoutLink);
    }
}
