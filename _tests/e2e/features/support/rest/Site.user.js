const faker = require('faker');

class SiteUser {

    generate() {
        let details;
        details = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: `redhat-developers-testers+sid_${process.env.SESSION_ID}_${faker.random.number()}@redhat.com`,
            password: 'P@$$word01'
        };
        return details
    }
}

module.exports = SiteUser;
