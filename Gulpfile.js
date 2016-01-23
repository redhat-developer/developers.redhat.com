var gulp = require ('gulp'); 
var plugins = require('gulp-load-plugins')();

var globs = {
  // TODO: Need to find a fix for adobe analytics
  "scripts": [
    'javascripts/vendor/jquery.xdomainrequest.js',
    'javascripts/extensions.js',
    'javascripts/vendor/keycloak.js',
    'javascripts/sso.js',
    'javascripts/dcp.js',
    'javascripts/buzz.js',
    'javascripts/jquery-deparam.js',
    'javascripts/developer-materials.angular.js',
    'javascripts/vendor/chosen.jquery.min.js',
    'javascripts/projects.js',
    'javascripts/books.js',
    'javascripts/rating.js',
    'javascripts/vendor/modernizr-custom.js',
    'javascripts/vendor/polyfiller.js',
    'javascripts/polyfiller-init.js',
    'javascripts/foundation/foundation.js',
    'javascripts/foundation/foundation.tab.js',
    'javascripts/foundation/foundation.reveal.js',
    'javascripts/foundation/foundation.tooltip.js',
    'javascripts/foundation/foundation.dropdown.js',
    'javascripts/foundation/foundation.equalizer.js',
    'javascripts/vendor/swipe.js',
    'javascripts/mobile.js',
    'javascripts/vendor/jquery.resize.js',
    'javascripts/vendor/jquery.timeago.js',
    'javascripts/vendor/socialite.min.js',
    'javascripts/vendor/jquery.paging.min.js',
    'javascripts/vendor/ytembed.js',
    'javascripts/terms-and-conditions.js',
    'javascripts/search.js',
    'javascripts/os-filter.js',
    'javascripts/social.js',
    'javascripts/visual.js',
    'javascripts/microsite.js',
    'javascripts/connectors.js',
    'javascripts/overlay.js',
    'javascripts/devnation2015.js',
    'javascripts/book-download.js',
    'javascripts/jira-collector.js',
    'javascripts/carousel.js',
    'javascripts/video.js',
    'javascripts/downloads.js',
    'javascripts/jdfadvise.js',
    'javascripts/vendor/class.create.js',
    'javascripts/vendor/jquery-encoder-0.1.0.js',
    'javascripts/vendor/jquery.filedownload.js',
    'javascripts/vendor/highlight.min.js',
    'javascripts/vendor/highlight-init.js',
    '!javascripts/namespace.js', 
    '!javascripts/adobe-analytics.js'
  ],
  "styles": ['stylesheets/*.scss']
};

gulp.task('scripts',function() {
  gulp.src(globs.scripts)
    .pipe(plugins.plumber({errorHandler: plugins.notify.onError("Error: <%= error.message %>")}))
    .pipe(plugins.concat('all.js'))
    .pipe(plugins.injectString.wrap('(function($){', '})(jQuery);'))
    //.pipe(plugins.uglify())
    .pipe(plugins.rename('all.min.js'))
    .pipe(gulp.dest('_drupal/themes/custom/rhd/js/'));
});

gulp.task('sass', function() {
  gulp.src(globs.styles)
    .pipe(plugins.plumber({errorHandler: plugins.notify.onError("Error: <%= error.message %>")}))
    .pipe(plugins.sass({outputStyle: 'compressed', outFile: 'app.css'}))
    .pipe(gulp.dest('_drupal/themes/custom/rhd/css/base'));
});

gulp.task('default', ['scripts', 'sass']);

