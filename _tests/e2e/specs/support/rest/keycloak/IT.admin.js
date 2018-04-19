const request = require('sync-request');
const qs = require('querystring');
const wait = require('asyncawait/await');

// We have outdated certs in our staging environment. This allows us to access the staging i.t admin.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 *  IT Admin contains a set of functions that use the admin service to generate and manipulate test data
 *  (NOTE: Used for Staging environment ONLY)
 */
class ItAdmin {

    /**
     * Creates an active OpenShift account
     * @param  user - User credentials
     */
    createSimpleUser(user) {
        let url = 'http://servicejava.edge.stage.ext.phx2.redhat.com/svcrest/simpleuser/suser/thirdparty?system=rhd';
        try {
            wait(request('POST', url, {
                headers: {
                    "Content-Type": "application/json",
                },
                json: {
                    "disabled": false,
                    "emailAddress": user['email'],
                    "emailVerified": true,
                },
                agent: false
            }));
        } catch (e) {
            return new Error(`Failed to create simple user: ${e}`)
        }
        return this._changePassword(user['email'], user['password']);
    }

    /**
     * Creates an active Customer portal account
     * @param  user - User credentials
     */
    createFullUser(user) {
        let url = 'http://servicejava.edge.stage.ext.phx2.redhat.com/svcrest/user/v3/createwithoutwelcome';
        try {
            return wait(request('POST', url, {
                headers: {
                    "Content-Type": "application/json",
                },
                json: {
                    "userType": 'P',
                    "login": user['email'],
                    "active": true,
                    "password": user['password'],
                    "system": 'WEB',

                    "personalInfo": {
                        "company": user['company'],
                        "firstName": user['firstName'],
                        "title": user['title'],
                        "greeting": user['title'],
                        "lastName": user['lastName'],
                        "email": user['email'],
                        "emailConfirmed": true,
                        "phoneNumber": user['phoneNumber'],
                        "password": user['password'],
                        "locale": 'en_GB'
                    },

                    "personalSite": {
                        "defaultSite": true,
                        "siteType": 'MARKETING',

                        "address": {
                            "address1": '100 E. Davie Street',
                            "countryCode": 'US',
                            "postalCode": '27601',
                            "city": 'Raleigh',
                            "poBox": false
                        }
                    },
                    agent: false
                }
            }));
        } catch (e){
            return new Error(`Failed to create full site user: ${e}`)
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
            return wait(request('PUT', url, {
                headers: {"Content-Type": "application/json"},
                agent: false
            }));
        } catch (e) {
            return new Error(`Failed to update password: ${e}`)

        }
    }

    /**
     * Searches for a user by registered email address
     * @param  email    - email address of the user you wish to search for
     */
    findUserByEmail(email) {
        let res;
        let encodedEmail = qs.escape(email);
        let url = `http://servicejava.edge.stage.ext.phx2.redhat.com/svcrest/user/v3/email=${encodedEmail}`;
        try {
            res = wait(request('GET', url, {
                headers: {"Content-Type": "application/json"},
                agent: false
            }));
            return JSON.parse(res.getBody().toString('utf8'));

        } catch (e) {
            return new Error(`Failed to find use with email: ${email}`)
        }
    }

    /**
     * Disable a registered user
     * @param  user - hash of user rhdAccountDetails
     */
    disableUser(user) {
        let userProfile = this.findUserByEmail(user['email']);
        let url = 'http://servicejava.edge.stage.ext.phx2.redhat.com/svcrest/user/v3/update';
        let res = wait(request('POST', url, {
            headers: {
                "Content-Type": "application/json",
            },
            json: {
                "id": userProfile[0]['id'],
                "login": user['email'],
                "userType": 'P',
                "active": false,
                "password": user['password'],
                "system": 'WEB',

                "personalInfo": {
                    "company": user['company'],
                    "firstName": user['firstName'],
                    "title": user['title'],
                    "greeting": user['title'],
                    "lastName": user['lastName'],
                    "email": user['email'],
                    "emailConfirmed": 'true',
                    "phoneNumber": user['phoneNumber'],
                    "password": user['password'],
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
                },
                agent: false
            }
        }));

        console.log(JSON.parse(res.getBody().toString('utf8')));

        if (res.statusCode === 500) {
            return new Error('Failed to disable user account')
        }
    }

}

module.exports = ItAdmin;
