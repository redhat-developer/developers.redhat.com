const qs = require('querystring');
const config = require('../../../config/wdio.conf.base').config;
import Driver from '../utils/Driver.Extension';


class Utils {
    allowDownloads() {
        Driver.allowDownloads();
    }

    cleanSession() {
        let logoutLink;
        const encodedURL = qs.escape(config.baseUrl);
        if (config.baseUrl === 'https://developers.stage.redhat.com') {
            logoutLink = `https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`;
        } else {
            logoutLink = `https://developers.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`;
        }
        return Driver.visit(logoutLink);
    }
}

export default new Utils;

