const request = require('sync-request');
const qs = require('querystring');
const await = require('asyncawait/await');

// We have outdated certs in our staging environment. This allows us to access the staging keycloak admin.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 *  IT Admin contains a set of functions that use the admin service to generate and manipulate test data
 *  (NOTE: Used for Staging environment ONLY)
 */
class ItAdmin {


    /**
     * Creates an active OpenShift account
     * @param  email    - email that you wish to generated a user for
     * @param  password - updated password
     */
    createSimpleUser(email, password) {
        let url = 'http://servicejava.edge.stage.ext.phx2.redhat.com/svcrest/simpleuser/suser/thirdparty?system=rhd';
        try {
            await(request('POST', url, {
                headers: {
                    "Content-Type": "application/json",
                },
                json: {
                    "disabled": false,
                    "emailAddress": email,
                    "emailVerified": true,
                }
            }));
        } catch (e) {
            throw new Error(`Failed to create simple user: ${e}`)
        }

        this._changePassword(email, password)
    }

    /**
     * Creates an active Customer portal account
     * @param  email    - email that you wish to generated a user for
     * @param  password - updated password
     */
    createFullUser(email, password) {
        let url = 'http://servicejava.edge.stage.ext.phx2.redhat.com/svcrest/user/v3/createwithoutwelcome';
        let res = await(request('POST', url, {
            headers: {
                "Content-Type": "application/json",
            },
            json: {
                "userType": 'P',
                "login": email,
                "active": true,
                "password": password,
                "system": 'WEB',

                "personalInfo": {
                    "company": 'Red Hat',
                    "firstName": 'Test',
                    "title": 'Mr',
                    "greeting": 'Mr',
                    "lastName": 'Engineer',
                    "email": email,
                    "emailConfirmed": true,
                    "phoneNumber": '0191 1111111',
                    "password": password,
                    "locale": 'en_GB'
                },

                "personalSite": {
                    "defaultSite": true,
                    "siteType": 'MARKETING',

                    "address": {
                        "address1": 'Science Central, Bath Ln',
                        "countryCode": 'GB',
                        "postalCode": 'NE4 5TF',
                        "city": 'Newcastle upon Tyne',
                        "poBox": false
                    }
                }
            }
        }));

        if (res.statusCode !== 200) {
            throw new Error('Failed to create full site user')
        }
    }

    /**
     * Changes password for given email address
     * @private
     * @param  email    - email that you wish to change password for
     * @param  password - updated password
     */
    _changePassword(email, password) {
        let encodedEmail = qs.escape(email);
        let url = `http://servicejava.edge.stage.ext.phx2.redhat.com/svcrest/simpleuser/pwd/login=${encodedEmail}?password=${password}`;
        try {
            await(request('PUT', url, {
                headers: {"Content-Type": "application/json"},
            }));
        } catch (e) {
            throw new Error(`Failed to update password: ${e}`)

        }
    }

    findUserByEmail(email) {
        let encodedEmail = qs.escape(email);
        let url = `http://servicejava.edge.stage.ext.phx2.redhat.com/svcrest/user/v3/email=${encodedEmail}`;
        let res = request('GET', url);
        return JSON.parse(res.getBody().toString('utf8'));
    }

    disableUser(email, password) {
        let userProfile = this.findUserByEmail(email);
        let url = 'http://servicejava.edge.stage.ext.phx2.redhat.com/svcrest/user/v3/update';
        let res = await(request('POST', url, {
            headers: {
                "Content-Type": "application/json",
            },
            json: {
                "id": userProfile[0]['id'],
                "login": email,
                "userType": 'P',
                "active": false,
                "password": password,
                "system": 'WEB',

                "personalInfo": {
                    "company": 'Red Hat',
                    "firstName": 'Test',
                    "title": 'Mr',
                    "greeting": 'Mr',
                    "lastName": 'Engineer',
                    "email": email,
                    "emailConfirmed": 'true',
                    "phoneNumber": '0191 1111111',
                    "password": password,
                    "locale": 'en_GB'
                },

                "personalSite": {
                    "id": userProfile[0]['personalSite']['id'],
                    "defaultSite": true,
                    "siteType": 'MARKETING',

                    "address": {
                        "address1": 'Science Central, Bath Ln',
                        "countryCode": 'GB',
                        "postalCode": 'NE4 5TF',
                        "city": 'Newcastle upon Tyne',
                        "poBox": false
                    },
                    "active": false
                }
            }
        }));

        console.log(JSON.parse(res.getBody().toString('utf8')));

        if (res.statusCode === 500) {
            throw new Error('Failed to disable user account')
        }
    }

}

module.exports = ItAdmin;

