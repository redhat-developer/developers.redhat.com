import {Base} from "../support/pages/Base.page";

const qs = require('querystring');

export class Utils extends Base {

    logout(baseUrl) {
        let logoutLink;
        let encodedURL = qs.escape(baseUrl);
        if (process.env.RHD_BASE_URL === 'https://developers.stage.redhat.com') {
            logoutLink = `https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`
        } else {
            logoutLink = `https://developers.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`
        }
        return this.visit(logoutLink);
    }

}
