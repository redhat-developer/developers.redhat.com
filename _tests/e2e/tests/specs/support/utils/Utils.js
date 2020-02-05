const qs = require('querystring');
const config = require('../../../config/wdio.conf.base').config;
import Driver from '../utils/Driver.Extension';


class Utils {
    isProduction() {
        return config.baseUrl.includes('https://developers.redhat.com');
    }

    isManagedPaasEnvironment() {
        return config.baseUrl.includes('.preprod.paas.redhat.com');
    }

    cleanSession() {
        let logoutLink;
        const encodedURL = qs.escape(config.baseUrl);
        if (this.isProduction() === true) {
            logoutLink = `https://developers.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`;
        } else {
            logoutLink = `https://sso.stage.redhat.com/auth/realms/redhat-external/protocol/openid-connect/logout?redirect_uri=${encodedURL}`;
        }

        return Driver.visit(logoutLink);
    }
}

export default new Utils;
