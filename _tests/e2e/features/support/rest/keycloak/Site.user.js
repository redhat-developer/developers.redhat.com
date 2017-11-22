const faker = require('faker');
import {KeyCloakAdmin} from "./Keycloak.admin"
import {ItAdmin} from "./IT.admin"
import {gmail} from "./Gmail"
let keyCloakAdmin = new KeyCloakAdmin();
let itAdmin = new ItAdmin();

class SiteUser {

    generate() {
        return this._generateCustomerCredentials()
    }

    createRHDSiteUser() {
        let user = this.generate();
        user['rhUserId'] = keyCloakAdmin.registerNewUser(user);
        console.log(`Registered new RHD site user with email: ${user['email']} and password: ${user['password']}`);
        // return registered user details, and rhd User ID
        return user
    }

    productionSiteUser() {
        let details;

        details = {
            title: this._selectRandom(['Mr', 'Mrs']),
            firstName: 'Automated',
            lastName: 'Test-User',
            email: 'redhat-developers-testers@redhat.com',
            username: 'redhat-developers-testers',
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
        itAdmin.createSimpleUser(user);
        console.log(`Registered new OpenShift site user with email: ${user['email']} and password: ${user['password']}`);
        // return registered user details
        return user
    }

    createCustomerPortalAccount() {
        let user = this.generate();
        itAdmin.createFullUser(user);
        console.log(`Registered new Customer Portal site user with email: ${user['email']} and password: ${user['password']}`);
        // return registered user details
        return user
    }

    disableCustomerPortalAccount(user) {
        return itAdmin.disableUser(user);
    }

    verifyRHDAccount(email) {
        return gmail.process(email);
    }

    createUserWithLinkedSocialAccount() {
        let user = this.generate();
        keyCloakAdmin.registerNewUser(user);
        user['gitHubUsername'] = 'rhdsociallogin';
        user['gitHubPassword'] = 'P@$$word01';
        keyCloakAdmin.linkSocialProvider(user['email'], 'github', '20190656', user['gitHubUsername']);
        // return registered user details
        return user
    }

    createUserWithUnLinkedSocialAccount() {
        let user = this.generate();
        keyCloakAdmin.registerNewUser(user);
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
        return keyCloakAdmin.getUserAttribute(email, attribute)
    }

    getSocialLogins(email) {
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
        let details;

        let emailAddress = `redhat-developers-testers+sid_${process.env.SESSION_ID}_${faker.random.number()}@redhat.com`.toString();

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

const siteUser = new SiteUser();

export {
    siteUser
};
