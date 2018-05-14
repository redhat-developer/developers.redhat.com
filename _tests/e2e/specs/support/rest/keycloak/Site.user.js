const faker = require('faker');
const KeyCloakAdmin = require("./Keycloak.admin");
const ItAdmin = require("./IT.admin");
const Gmail = require("./Gmail");

class User {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    generate() {
        return this._generateCustomerCredentials()
    }

    rhdAccountDetails() {
        if (this.baseUrl === 'https://developers.stage.redhat.com') {
            return this.createRHDSiteUser();
        } else {
            return this.productionSiteUser();
        }
    }

    createRHDSiteUser() {
        let user = this.generate();
        let keyCloakAdmin = new KeyCloakAdmin();
        user['rhUserId'] = keyCloakAdmin.registerNewUser(user);
        console.log(`Registered new RHD site user with email: ${user['email']} and password: ${user['password']}`);
        // return registered user rhdAccountDetails, and rhd User ID
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
        let itAdmin = new ItAdmin();
        itAdmin.createSimpleUser(user);
        console.log(`Registered new OpenShift site user with email: ${user['email']} and password: ${user['password']}`);
        // return registered user rhdAccountDetails
        return user
    }

    createCustomerPortalAccount() {
        let user = this.generate();
        let itAdmin = new ItAdmin();
        itAdmin.createFullUser(user);
        console.log(`Registered new Customer Portal site user with email: ${user['email']} and password: ${user['password']}`);
        // return registered user rhdAccountDetails
        return user
    }

    disableCustomerPortalAccount(user) {
        let itAdmin = new ItAdmin();
        return itAdmin.disableUser(user);
    }

    verifyRHDAccount(email) {
        let gmail = new Gmail();
        return gmail.process(email);
    }

    createUserWithLinkedSocialAccount() {
        let user = this.generate();
        let keyCloakAdmin = new KeyCloakAdmin();
        keyCloakAdmin.registerNewUser(user);
        user['gitHubUsername'] = 'rhdsociallogin';
        user['gitHubPassword'] = 'P@$$word01';
        keyCloakAdmin.linkSocialProvider(user['email'], 'github', '20190656', user['gitHubUsername']);
        // return registered user rhdAccountDetails
        return user
    }

    createUserWithUnLinkedSocialAccount() {
        let user = this.generate();
        let keyCloakAdmin = new KeyCloakAdmin();
        keyCloakAdmin.registerNewUser(user);
        user['gitHubUsername'] = 'rhdsociallogin';
        user['gitHubPassword'] = 'P@$$word01';
        // return registered user rhdAccountDetails
        return user
    }

    gitHubAccountUser() {
        let details;

        let emailAddress = `redhat-developers-testers+sid_${faker.random.number()}@redhat.com`.toString();

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
            countryCode: 'US',
            gitHubUsername: 'keycloak-dm-user',
            gitHubPassword: 'P@$$word01'
        };
        return details
    }

    getUserAttribute(email, attribute) {
        let keyCloakAdmin = new KeyCloakAdmin();
        return keyCloakAdmin.getUserAttribute(email, attribute)
    }

    getSocialLogins(email) {
        let keyCloakAdmin = new KeyCloakAdmin();
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

        let emailAddress = `redhat-developers-testers+${faker.random.number()}@redhat.com`;

        details = {
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
            countryCode: 'US'
        };
        return details
    }

    _selectRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}

module.exports = User;
