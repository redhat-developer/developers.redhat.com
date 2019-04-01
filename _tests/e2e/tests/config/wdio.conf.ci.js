const commandlineArgs = require('minimist')(process.argv.slice(2));
const base = require('./wdio.conf.base.js').config;
const Browser = require('../specs/support/Browser.Manager');
const browserCaps = new Browser(commandlineArgs['browser'], commandlineArgs['headless']).create();
const gridHost = typeof process.env.GRID_HOST === 'undefined' ? 'localhost' : process.env.GRID_HOST;

const dockerConfig = Object.assign(base, {
    hostname: gridHost,
    capabilities: [browserCaps],
    maxInstances: 10,
});

exports.config = dockerConfig;
