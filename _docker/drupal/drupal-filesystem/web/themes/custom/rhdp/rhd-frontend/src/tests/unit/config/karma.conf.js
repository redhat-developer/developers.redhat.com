"use strict";
// Karma configuration for running unit-tests in Docker
module.exports = function (config) {
    config.set({
        browsers: ['ChromeNoSandbox'],
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-jasmine-ajax',
            'karma-htmlfile-reporter'
        ],
        //logLevel: config.LOG_DEBUG,
        singleRun: true,
        colors: true,
        frameworks: ['jasmine-ajax', 'jasmine'],
        reporters: ['progress', 'html'],
        htmlReporter: {
            outputFile: '../report/index.html',
            pageTitle: 'RHD frontend unit-test results'
        },
        failOnEmptyTestSuite: false,

        files: [
            // 'jasmine-global.js',
            'jquery.min.js',
            'angular.min.js',
            'drupal-scaffold.js',
            'system-production.js', // 'https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.21.4/system-production.js',
            'custom-elements-es5-adapter.js', // 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/custom-elements-es5-adapter.js',
            'webcomponents-bundle.js', // 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-bundle.js',
            '../../../../rhd.min.js',
            '../../../../init.js',
            '../**/*_spec.js'
      ],
      customLaunchers: {
          ChromeNoSandbox: {
            base: 'ChromeHeadless',
            flags: [
              '--no-sandbox',
              '--user-data-dir=/tmp'
            ]
          }
      }
    })
};
