const faker = require('faker');
const KeyCloakAdmin = require("./Keycloak.admin");
const ITAdmin = require("./IT.admin");
const GetMail = require('./Gmail');

class SiteUser {

    generate(country = null) {
        return this._generateCustomerCredentials(country)
    }

    createRHDSiteUser() {
        let user = this.generate();
        let keycloakAdmin = new KeyCloakAdmin();
        user['rhUserId'] = keycloakAdmin.registerNewUser(user);
        // return registered user details, and rhd User ID
        return user
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
        keycloakAdmin.linkSocialProvider(user['email'], 'github', '20190656', 'rhdsociallogin');
        // return registered user details
        return user
    }

    getUserAttribute(email, attribute) {
        let keycloakAdmin = new KeyCloakAdmin();
        return keycloakAdmin.getUserAttribute(email, attribute)
    }


    /**
     private functions

     /**
     * Generate unique customer credentials
     * @private
     * @param  {Object} country
     * @return {Hash}: Customer credentials
     */
    _generateCustomerCredentials(country) {
        let selectCountry;
        let details;
        let extraAddressArgs;

        if (country === null) {
            selectCountry = this._selectRandom(['United Kingdom', 'United States'])
        } else {
            selectCountry = country
        }

        extraAddressArgs = this._getExtraAddressArgs(selectCountry);

        let emailAddress = `redhat-developers-testers+sid_${process.env.SESSION_ID}_${faker.random.number()}@redhat.com`;

        details = {
            title: this._selectRandom(['Mr', 'Mrs']),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: emailAddress,
            username: emailAddress.replace('@redhat.com', ''),
            password: 'P@$$word01',
            company: faker.company.companyName(),
            phoneNumber: faker.phone.phoneNumber(),
            country: selectCountry,
            addressLineOne: faker.address.streetName(),
            city: extraAddressArgs['city'],
            state: extraAddressArgs['state'],
            postalCode: faker.address.zipCode(),
            countryCode: extraAddressArgs['countryCode']
        };
        return details
    }


    /**
     * Get US city and state if country selected is US
     * @private
     * @param  {Object} country
     * @return {Hash}: US city and state, otherwise return null
     */
    _getExtraAddressArgs(country) {
        let details;
        if (country === 'United States') {
            details = {
                state: 'Washington',
                city: 'Washington DC',
                countryCode: 'US'
            };
        } else {
            details = {
                state: null,
                city: null,
                countryCode: 'GB'
            };
        }
        return details;
    }

    _selectRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}

module.exports = SiteUser;
