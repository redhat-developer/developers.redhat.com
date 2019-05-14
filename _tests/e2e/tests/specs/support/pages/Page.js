import Driver from '../utils/Driver.Extension';
const config = require('../../../config/wdio.conf.base').config;

export default class Page {
    get loggedInName() {return $('.logged-in-name');}
    open(path) {
        Driver.visit(config.baseUrl + path);
    }

    drupalHost() {
        const parsedUrl = require('url').parse(config.baseUrl);
        const prNumber = parseInt(parsedUrl.pathname.split('/')[2]);
        return `http://rhdp-jenkins-slave.lab4.eng.bos.redhat.com:${(35000 + prNumber)}`;
    }

    drupalLogout() {
        Driver.visit(this.drupalHost() + '/user/logout');
    }
}
