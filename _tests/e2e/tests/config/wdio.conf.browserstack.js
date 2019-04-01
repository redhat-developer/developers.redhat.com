const base = require('./wdio.conf.base.js').config;
const browserstackConfig = Object.assign(base, {
    user: process.env.RHD_BS_USERNAME,
    key: process.env.RHD_BS_AUTHKEY,
    browserstackLocal: true,
    services: ['browserstack'],
    maxInstances: 1,
});

exports.config = browserstackConfig;
