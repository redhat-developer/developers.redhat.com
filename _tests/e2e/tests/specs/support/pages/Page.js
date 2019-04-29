import Driver from '../utils/Driver.Extension';
const config = require('../../../config/wdio.conf.base').config;

export default class Page {
    open(path) {
        Driver.visit(config.baseUrl + path);
    }
}
