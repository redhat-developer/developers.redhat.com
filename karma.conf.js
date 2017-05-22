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
      'karma-polymer',
      'karma-spec-reporter'
    ],
    //logLevel: config.LOG_DEBUG,
    singleRun: true,
    colors: true,
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['polymer','jasmine-ajax','jasmine'],
    reporters: ['spec'],
    // list of files / patterns to load in the browser
    files: [
      { pattern: 'components/**', included: false, served: true, watched: true },
      //{ pattern: 'public/components/*.html', included: false, served: true, watched: true },
      '_tests/karma/**/*_spec.js'
    ],
    polymer: {
      platform: 'components/webcomponentsjs/webcomponents-lite.js',
      src: [
        'components/polymer/polymer.html',
        'components/rhdp*/*.html'
        //'components/rhdp-search/rhdp-search-result-count.html'
      ]
    }
  })
}
