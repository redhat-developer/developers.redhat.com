"use strict";
// Karma configuration
// Generated on Tue May 16 2017 14:18:30 GMT-0400 (EDT)

module.exports = function(config) {
    config.set({
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['Chrome'],
        browsers: ['ChromeCanaryHeadless'],
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-jasmine-ajax',
            'karma-spec-reporter'
        ],
    //logLevel: config.LOG_DEBUG,
        singleRun: true,
        colors: true,
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine-ajax', 'jasmine'],
        reporters: ['spec'],
    // list of files / patterns to load in the browser
        files: [
            'javascripts/vendor/custom-elements-es5-adapter.js',
            'javascripts/vendor/webcomponents-lite.js',
            'javascripts/build.js',
            '_tests/karma/**/*_spec.js'
        ]
    })
}
