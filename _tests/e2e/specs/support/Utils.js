const qs = require('querystring');

export class Utils {

    logout(baseUrl) {
        let encodedURL = qs.escape(baseUrl);
        try {
            if (process.env.RHD_BASE_URL === 'https://developers.stage.redhat.com') {
                return browser.url(`https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`)
            } else {
                return browser.url(`https://developers.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=${encodedURL}`)
            }
        } catch (e) {
            console.log(e)
        }
    }
}
