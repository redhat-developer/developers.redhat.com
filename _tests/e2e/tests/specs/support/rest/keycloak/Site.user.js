/* eslint-disable no-else-return */
const faker = require('faker');
const config = require('../../../../config/wdio.conf.base').config;
import KeyCloakAdmin from './Keycloak.admin';
import ItAdmin from './IT.admin';

class User {
    constructor() {
        this.baseUrl = config.baseUrl;
    }

    generate() {
        return this._generateCustomerCredentials();
    }

    rhdAccountDetails() {
        return this.createRHDSiteUser();
    }

    createRHDSiteUser() {
        const user = this.generate();
        const keyCloakAdmin = new KeyCloakAdmin();
        user.rhUserId = keyCloakAdmin.registerNewUser(user);
        // return registered user rhdAccountDetails, and rhd User ID
        return user;
    }

    createOpenshiftUser() {
        const user = this.generate();
        const itAdmin = new ItAdmin();
        itAdmin.createSimpleUser(user);
        // return registered user rhdAccountDetails
        return user;
    }

    createCustomerPortalAccount() {
        const user = this.generate();
        const itAdmin = new ItAdmin();
        itAdmin.createFullUser(user);
        // return registered user rhdAccountDetails
        return user;
    }

    disableCustomerPortalAccount(user) {
        const itAdmin = new ItAdmin();
        return itAdmin.disableUser(user);
    }

    createUserWithLinkedSocialAccount() {
        const user = this.generate();
        const keyCloakAdmin = new KeyCloakAdmin();
        keyCloakAdmin.registerNewUser(user);
        user.gitHubUsername = 'rhdsociallogin';
        user.gitHubPassword = 'P@$$word01';
        keyCloakAdmin.linkSocialProvider(user.email, 'github', '20190656', user.gitHubUsername);
        // return registered user rhdAccountDetails
        return user;
    }

    createUserWithUnLinkedSocialAccount() {
        const user = this.generate();
        const keyCloakAdmin = new KeyCloakAdmin();
        keyCloakAdmin.registerNewUser(user);
        user.gitHubUsername = 'rhdsociallogin';
        user.gitHubPassword = 'P@$$word01';
        // return registered user rhdAccountDetails
        return user;
    }

    gitHubAccountUser() {
        const emailAddress = `redhat-developers-testers+sid_${faker.random.number()}@redhat.com`.toString();
        const details = {
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
            countryCode: 'US',
            gitHubUsername: 'keycloak-dm-user',
            gitHubPassword: 'P@$$word01',
        };
        return details;
    }

    getUserAttribute(email, attribute) {
        const keyCloakAdmin = new KeyCloakAdmin();
        return keyCloakAdmin.getUserAttribute(email, attribute);
    }

    getSocialLogins(email) {
        const keyCloakAdmin = new KeyCloakAdmin();
        return keyCloakAdmin.getSocialLogins(email);
    }


    /**
     private functions
     /**
     * Generate unique customer credentials
     * @private
     * @return {Hash}: Customer credentials
     */
    _generateCustomerCredentials() {
        const emailAddress = `redhat-developers-testers+${faker.random.number()}@redhat.com`;
        const details = {
            username: `rhdtest_${faker.random.number()}`,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: emailAddress,
            password: 'P@$$word01',
            company: 'Red Hat',
            phoneNumber: '019197544950',
            title: this._selectRandom(['Mr', 'Mrs']),
            country: 'US',
            addressLineOne: '100 E Davie St',
            city: 'Raleigh',
            state: 'NC',
            postalCode: '27601',
            countryCode: 'US',
        };
        return details;
    }

    _selectRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}

export default User;
