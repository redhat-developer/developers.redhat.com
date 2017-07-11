// require base configuration
var baseConfig = require('./wdio.conf.base.js').config;
var BrowserManager = require('./BrowserManager');

browserCaps = BrowserManager.createBrowser(process.env.RHD_JS_DRIVER);

// delete any unwanted properties
delete baseConfig.specs;
delete baseConfig.exclude;
delete baseConfig.screenshotPath;
delete baseConfig.cucumberOpts;

// clone prod config and add new properties/overrides
var dockerConfig = Object.assign(baseConfig, {

    host: process.env.SELENIUM_HOST,
    port: '4444',

    maxInstances: 10,
    capabilities: [browserCaps],
    services: ['selenium-standalone'],

    specs: [
        'features/*.feature'
    ],

    exclude: [
        'support/pages/*.page.js', 'support/sections/*.section.js'
    ],

    screenshotPath: 'reports/errorShots',
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: http://webdriver.io/guide/testrunner/reporters.html
    // reporters: ['dot'],//
    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        require: ['features/step_definitions'],        // <string[]> (file/dir) require files before executing features
        backtrace: false,   // <boolean> show full backtrace for errors
        compiler: [],       // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false,      // <boolean> invoke formatters without executing steps
        failFast: false,    // <boolean> abort the run on first failure
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true,       // <boolean> disable colors in formatter output
        snippets: true,     // <boolean> hide step definition snippets for pending steps
        source: true,       // <boolean> hide source uris
        profile: [],        // <string[]> (name) specify the profile to use
        strict: false,      // <boolean> fail if there are any undefined or pending steps
        tags: [],           // <string[]> (expression) only execute the features or scenarios with tags matching the expression
        timeout: 20000,     // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
    },
});


exports.config = dockerConfig;

