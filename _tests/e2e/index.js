const path = require('path');
const Chimp = require('chimp');
const reporter = require('cucumber-html-reporter');
const async = require('async');

let options;

if (process.env.RHD_TEST_CONFIG === 'docker') {
    options = require('./config/chimp-docker.js');
} else if (process.env.RHD_TEST_CONFIG === 'browserstack') {
    options = require('./config/chimp-browserstack.js');
} else {
    options = require('./config/chimp-docker.js');
}

let nodeModulePath;
if (process.env.RHD_TEST_CONFIG === 'docker') {
    nodeModulePath = '/home/e2e/node_modules/chimp/dist/bin/default.js';
} else {
    nodeModulePath = path.resolve(process.cwd() + '/node_modules/chimp/dist/bin/default.js');
}

async.series([
    function (callback) {
        const chimpDefaultOptions = require(nodeModulePath);
        options._ = [];
        const chimpOptions = Object.assign({}, chimpDefaultOptions, options);
        const chimp = new Chimp(chimpOptions);
        chimp.init(function (err, results) {
            if (err === 'Cucumber steps failed') err = 1; //stops async crashing out on failed tests, still want the report and cleanup
            return callback(err, results);
        })
    }], function (err, results) {
    reporter.generate(options);
    if (err === 1) {
        console.log(`Cucumber tests failed. Exit code was ${err}`);
        process.exit(err)
    } else {
        process.exit()
    }
});
