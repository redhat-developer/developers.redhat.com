"use strict";
let mixin = require('xmultiple');

let BasePage = require('./base.page');
let NavigationBar = require('../sections/navigationBar.section');

class SearchPage extends mixin(BasePage, NavigationBar) {

    open(searchTerm) {
        super.open(`/search/?q=${searchTerm}`);
    }

    get searchBar() { return $(".user-search"); }

}

module.exports = new SearchPage();
