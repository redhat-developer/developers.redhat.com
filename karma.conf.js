// Karma configuration
// Generated on Tue May 16 2017 14:18:30 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['Chrome'],
    browsers: ['ChromeCanaryHeadless'],
    //logLevel: config.LOG_DEBUG,
    singleRun: true,
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['polymer','jasmine'],
    // list of files / patterns to load in the browser
    files: [
      { pattern: 'bower_components/**', included: false, served: true, watched: true },
      //{ pattern: 'public/components/*.html', included: false, served: true, watched: true },
      '_tests/karma/**/*_spec.js'
    ],
    proxies: {
      '/bower_components/': '/base/bower_components/',
      '/components/': '/base/components/'
    },
    polymer: {
      platform: 'bower_components/webcomponentsjs/webcomponents-lite.js',
      src: [
        //'bower_components/polymer/polymer.html',
        //'components/**/*.html'
        'components/rhdp-search-result-count.html'
      ]
    }
  })
}
