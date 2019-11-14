"use strict";
// Karma configuration for running unit-tests in Docker
module.exports = function (config) {
    config.set({
        browsers: ['ChromeHeadlessNoSandbox'],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'Chrome',
                flags: [
                    '--headless',
                    '--no-sandbox',
                    '--disable-gpu',
                    '--enable-logging',
                    '--no-default-browser-check',
                    '--no-first-run',
                    '--disable-default-apps',
                    '--disable-popup-blocking',
                    '--disable-translate',
                    '--disable-background-timer-throttling',
                    '--disable-renderer-backgrounding',
                    '--disable-device-discovery-notifications',
                    '--remote-debugging-port=9222',
                    '--disable-web-security'
                ]
            }
        },
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-jasmine-ajax',
            'karma-junit-reporter',
            'karma-htmlfile-reporter'
        ],
        //logLevel: config.LOG_DEBUG,
        singleRun: true,
        colors: true,
        frameworks: ['jasmine-ajax', 'jasmine'],
        reporters: ['progress', 'html', 'junit'],
        htmlReporter: {
            outputFile: 'src/tests/unit/report/unit-test-report.html',
            pageTitle: 'RHD frontend unit-test results'
        },
        junitReporter: {
            outputDir: 'src/tests/unit/report/', // results will be saved as $outputDir/$browserName.xml
            outputFile: 'unit-test-report.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '', // suite will become the package name attribute in xml testsuite element
            useBrowserName: false, // add browser name to report and classes names
            nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
            properties: {}, // key value pair of properties to add to the <properties> section of the report
            xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format
        },
        failOnEmptyTestSuite: false,
        captureTimeout: 210000,
        browserDisconnectTolerance: 3,
        browserDisconnectTimeout : 210000,
        browserNoActivityTimeout : 210000,
        files: [
            // 'jasmine-global.js',
            'src/tests/unit/config/jquery.min.js',
            'src/tests/unit/config/angular.min.js',
            'src/tests/unit/config/foundation.min.js',
            'src/tests/unit/config/drupal-scaffold.js',
            'src/tests/unit/config/system.min.js', // 'https://cdnjs.cloudflare.com/ajax/libs/systemjs/2.1.1/system.min.js',
            'src/tests/unit/config/custom-elements-es5-adapter.js', // 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.2.1/custom-elements-es5-adapter.js',
            'src/tests/unit/config/webcomponents-bundle.js', // 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.2.1/webcomponents-bundle.js',
            {pattern: 'dist/js/**/*.js', included: false, watched: true},
            {pattern: 'src/tests/unit/**/*search*_spec.js', included: true, watched: true}
        ]
    })
};
