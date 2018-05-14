const request = require('sync-request');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 *  This Drupal Instance class contains a set of functions that make calls to a particular environments REST endpoint
 *  to retrieve products and data.
 */
class DrupalInstance {

    constructor() {
        this.accessCookie = this.generateAccessCookie()
    }

    generateAccessCookie() {
        let res = request("POST",
            `${process.env.RHD_DRUPAL_INSTANCE}/user/login`,
            {
                headers: {"content-type": "application/x-www-form-urlencoded"},
                body: `name=${process.env.RHD_DRUPAL_ADMIN_USERNAME}&pass=${process.env.RHD_DRUPAL_ADMIN_PASSWORD}&form_id=user_login_form`,
                followRedirects: false
            });
        let cookieHeader = res.headers['set-cookie'];
        return cookieHeader.toString().split(';')[0];
    }

    getProducts() {
        let res = request("GET",
            `${process.env.RHD_DRUPAL_INSTANCE}/drupal/products`,
            {
                headers: {"Cookie": this.accessCookie}
            },
        );

        let productNames = [];
        let productCodes = [];
        let allProducts = JSON.parse(res.getBody().toString('utf8'));
        allProducts.forEach(function (item) {
            productNames.push(item.title);
        });

        allProducts.forEach(function (item) {
            productCodes.push(item.field_url_product_name);
        });

        return [productNames, productCodes]


    }

}

export {
    DrupalInstance
};
