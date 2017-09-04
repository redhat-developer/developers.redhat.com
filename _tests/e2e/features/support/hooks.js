const SiteNav = require("../support/pages/Home.page");
const siteNav = new SiteNav();
const KeyCloakAdmin = require("../support/rest/Keycloak.admin");

const hooks = function () {

    this.After("@logout", function () {
        siteNav.clickLogout()
    });

    this.After("@delete_user", function () {
       let admin = new KeyCloakAdmin();
        admin.deleteUser(siteUser['email'])
    })
};

module.exports = hooks;
