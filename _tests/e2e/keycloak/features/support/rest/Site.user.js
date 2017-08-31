const faker = require('faker');
const KeyCloakAdmin = require("./Keycloak.admin");
const ITAdmin = require("./IT.admin");
const GetMail = require('./Gmail');

class SiteUser {

    generate() {
        return this._generateCustomerCredentials()
    }

    createRHDSiteUser() {
        let user = this.generate();
        let keycloakAdmin = new KeyCloakAdmin();
        user['rhUserId'] = keycloakAdmin.registerNewUser(user);
        // return registered user details, and rhd User ID
        return user
    }

    productionSiteUser() {
        let details;

        details = {
            title: this._selectRandom(['Mr', 'Mrs']),
            firstName: 'Hardcoded',
            lastName: 'Production-User',
            email: 'todo',
            username: 'todo',
            password: 'P@$$word01',
            company: 'Red Hat',
            phoneNumber: '019197544950',
            country: 'US',
            addressLineOne: '100 E Davie St',
            city: 'Raleigh',
            state: 'NC',
            postalCode: '27601',
            countryCode: 'US'
        };
        return details
    }

    createOpenshiftUser() {
        let user = this.generate();
        let itAdmin = new ITAdmin();
        itAdmin.createSimpleUser(user);
        // return registered user details
        return user
    }

    createCustomerPortalAccount() {
        let user = this.generate();
        let itAdmin = new ITAdmin();
        itAdmin.createFullUser(user);
        // return registered user details
        return user
    }

    disableCustomerPortalAccount(user) {
        let itAdmin = new ITAdmin();
        itAdmin.disableUser(user);
    }

    verifyRHDAccount(email) {
        let gmail = new GetMail();
        return gmail.process(email);
    }

    createUserWithLinkedSocialAccount() {
        let user = this.generate();
        let keycloakAdmin = new KeyCloakAdmin();
        keycloakAdmin.registerNewUser(user);
        user['gitHubUsername'] = 'rhdsociallogin';
        user['gitHubPassword'] = 'P@$$word01';
        keycloakAdmin.linkSocialProvider(user['email'], 'github', '20190656', user['gitHubUsername']);
        // return registered user details
        return user
    }

    createUserWithUnLinkedSocialAccount() {
        let user = this.generate();
        let keycloakAdmin = new KeyCloakAdmin();
        keycloakAdmin.registerNewUser(user);
        user['gitHubUsername'] = 'rhdsociallogin';
        user['gitHubPassword'] = 'P@$$word01';
        // return registered user details
        return user
    }

    gitHubAccountUser() {
        let details;

        details = {
            title: this._selectRandom(['Mr', 'Mrs']),
            firstName: 'Keycloak',
            lastName: 'Test-User',
            email: 'uk.redhat.test01.user@gmail.com',
            username: 'todo',
            password: 'P@$$word01',
            company: 'Red Hat',
            phoneNumber: '019197544950',
            country: 'US',
            addressLineOne: '100 E Davie St',
            city: 'Raleigh',
            state: 'NC',
            postalCode: '27601',
            countryCode: 'US',
            gitHubUsername: 'keycloak-dm-user',
            gitHubPassword: 'P@$$word01'
        };
        return details
    }

    getUserAttribute(email, attribute) {
        let keycloakAdmin = new KeyCloakAdmin();
        return keycloakAdmin.getUserAttribute(email, attribute)
    }

    getSocialLogins(email) {
        let keycloakAdmin = new KeyCloakAdmin();
        return keycloakAdmin.getSocialLogins(email);
    }


    /**
     private functions

     /**
     * Generate unique customer credentials
     * @private
     * @return {Hash}: Customer credentials
     */
    _generateCustomerCredentials() {
        let details;

        let emailAddress = `redhat-developers-testers+sid_${process.env.SESSION_ID}_${faker.random.number()}@redhat.com`;

        details = {
            title: this._selectRandom(['Mr', 'Mrs']),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: emailAddress,
            username: emailAddress.replace('@redhat.com', ''),
            password: 'P@$$word01',
            company: 'Red Hat',
            phoneNumber: '019197544950',
            country: 'US',
            addressLineOne: '100 E Davie St',
            city: 'Raleigh',
            state: 'NC',
            postalCode: '27601',
            countryCode: 'US'
        };
        return details
    }

    _selectRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}

module.exports = SiteUser;
