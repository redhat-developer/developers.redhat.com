'use strict';
const request = require('sync-request');
const qs = require('querystring');

// We have outdated certs in our staging environment. This allows us to access the staging keycloak admin.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 *  KeyCloakAdmin contains a set of functions that use the admin service to generate and manipulate test data
 *  (NOTE: Used for Staging environment ONLY)
 */
class KeyCloakAdmin {

    /**
     * Generates an access token in order to access the Keycloak admin
     * @return access_token
     */
    generateAccessToken() {
        let token;
        let request_body_map = 'username=automated-tests-user@redhat.com&grant_type=password&client_id=admin-cli&password=P@$$word01';
        let request_header = {"content-type": "application/x-www-form-urlencoded"};
        let endpoint = 'https://developers.stage.redhat.com/auth/realms/master/protocol/openid-connect/token';
        let response = request('POST', endpoint, {headers: request_header, body: request_body_map});
        token = JSON.parse(response.getBody().toString('utf8'));
        return token['access_token'];
    }

    /**
     * Registers new user using details inherited from the constructor
     * @param email       email address to register new user with
     * @param password    password to register new user with
     * @param firstName   first name to register new user with
     * @param lastName    last name to register new user with
     */
    registerNewUser(email, password, firstName, lastName) {
        let accessCode = this.generateAccessToken();
        let url = 'https://developers.stage.redhat.com/auth/admin/realms/rhd/users';
        let res = request('POST', url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessCode}`
            },
            json: {
                "enabled": true,
                "attributes": {'pwd': [password], 'tcacc-1246': ['y'], 'tcacc-1010': ['y'], 'tcacc-6': ['y']},
                "requiredActions": [],
                "username": email,
                "email": email,
                "emailVerified": true,
                "firstName": firstName,
                "lastName": lastName
            }
        });

        if (res.statusCode !== 201) {
            throw new Error('Failed to create new RHD user')
        }

    }

    /**
     * Searches admin by registered email address
     * @param  email       email that you wish to search for
     * @return user registered details
     */
    getUserBy(email) {
        let accessCode = this.generateAccessToken();
        let encodedEmail = qs.escape(email);
        let url = `https://developers.stage.redhat.com/auth/admin/realms/rhd/users?email=${encodedEmail}`;
        let res = request('GET', url, {
            headers: {"Authorization": `Bearer ${accessCode}`}
        });
        return JSON.parse(res.getBody().toString('utf8'));
    }

    /**
     * Get's user registered attributes, such as date of registration date,
     * rhd registered subscriptions etc
     * @param  email       email that you wish to search for
     * @param  attribute   attribute details you wish to get, for example rhdTacSignDateFormatted, or rhdSubscrValid
     * @return user specified attribute assigned
     */
    getUserAttribute(email, attribute) {
        let data = this.getUserBy(email);
        return data[0]['attributes'][attribute][0]
    }

    /**
     * Get's user registered social account logins
     * @param  email       email that you wish to search for
     * @return user assigned social account(s)
     */
    getSocialLogins(email) {
        let accessCode = this.generateAccessToken();
        let user = this.getUserBy(email);
        let userId = user[0]['id'];
        let url = `https://developers.stage.redhat.com/auth/admin/realms/rhd/users/${userId}/federated-identity`;
        let res = request('GET', url, {
            headers: {
                "Authorization": `Bearer ${accessCode}`,
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });
        return JSON.parse(res.getBody().toString('utf8'));
    }

    /**
     * Link a social account to an RHD registered account
     * @param  email              email that you wish to search for
     * @param  identityProvider   social media provider
     * @param  userId             User id of social provider
     * @param  userName           Username of social provider
     */
    linkSocialProvider(email, identityProvider, userId, userName) {
        let accessCode = this.generateAccessToken();
        let user = this.getUserBy(email);
        let rhdUserId = user[0]['id'];
        let url = `https://developers.stage.redhat.com/auth/admin/realms/rhd/users/${rhdUserId}/federated-identity/${identityProvider}`;

        let res = request('POST', url, {
            headers: {
                "Authorization": `Bearer ${accessCode}`,
                "Content-Type": "application/json",
            },
            json: {
                "identityProvider": identityProvider,
                "userId": userId,
                "userName": userName
            }
        });

        if (res.statusCode !== 204) {
            throw new Error(`Failed to link to link ${identityProvider} to ${userName}'s RHD account`)
        }
    }

    /**
     * Unlinks a assigned social account
     * @param  email              email that you wish to search for
     */
    unlinkSocialProvider(email) {
        let accessCode = this.generateAccessToken();
        let user = this.getUserBy(email);
        let rhdUserId = user[0]['id'];
        let userSocialLogins = this.getSocialLogins(email);
        let identityProvider = userSocialLogins[0]['identityProvider'];
        let url = `https://developers.stage.redhat.com/auth/admin/realms/rhd/users/${rhdUserId}/federated-identity/${identityProvider}`;
        try {
            request('DELETE', url, {headers: {"Authorization": `Bearer ${accessCode}`}});
        } catch (e) {
            new error(`failed to unlink social provider with email: ${email}. Error was ${e}`)
        }
    }

    /**
     * Deletes RHD registered account
     * @param  email   email that you wish to search for
     * NOTE: It is imposible to completely delete an account from the KeyCloak DB
     * therefore a previously deleted email cannot be used to register a new account
     */
    deleteUser(email) {
        let accessCode = this.generateAccessToken();
        let user = this.getUserBy(email);
        let userId = user[0]['id'];
        let url = `https://developers.stage.redhat.com/auth/admin/realms/rhd/users/${userId}`;
        try {
            request('DELETE', url, {headers: {"Authorization": `Bearer ${accessCode}`}});
            console.log(`Deleted RHD site user with email: ${email}`);
        } catch (e) {
            new error(`failed to delete user with email: ${email}. Error was ${e}`)
        }
    }
}

module.exports = KeyCloakAdmin;
