var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var sass = require("node-sass");
var sassUtils = require("node-sass-utils")(sass);

var globs = {
  // TODO: Need to find a fix for adobe analytics
    "scripts": [
        'javascripts/drupal-namespace.js',
        'javascripts/vendor/jquery.xdomainrequest.js',
        'javascripts/vendor/includes.js',
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
        // 'javascripts/vendor/polyfiller.js',
        // 'javascripts/polyfiller-init.js',
        'javascripts/foundation/foundation.js',
        'javascripts/foundation/foundation.tab.js',
        'javascripts/foundation/foundation.reveal.js',
        'javascripts/foundation/foundation.tooltip.js',
        'javascripts/foundation/foundation.dropdown.js',
        'javascripts/foundation/foundation.equalizer.js',
        'javascripts/foundation/foundation.accordion.js',
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
        'javascripts/carousel.js',
        'javascripts/video.js',
        'javascripts/downloads.js',
        'javascripts/jdfadvise.js',
        'javascripts/vendor/class.create.js',
        'javascripts/vendor/jquery-encoder-0.1.0.js',
        'javascripts/vendor/jquery.filedownload.js',
        'javascripts/vendor/highlight.min.js',
        'javascripts/vendor/highlight-init.js',
        'javascripts/vendor/moment.js',
        'javascripts/vendor/picker.js',
        'javascripts/vendor/picker.date.js',
        'javascripts/topics.js',
        'javascripts/datepicker-init.js',
        'javascripts/latest.js',
        'javascripts/events.js',
        'javascripts/contributors-quiz.js',
        'javascripts/vjbug-jira-collector.js',
        'javascripts/vjbug.js',
        'javascripts/tabs.js',
        'javascripts/a-b-testing.js',
        'javascripts/stackoverflow.js',
        'javascripts/product-forums.js',
        '!javascripts/namespace.js',
        'javascripts/custom-jira-collector.js',
        'javascripts/adaptive-placeholder.js',
        //'javascripts/current-tab.js',
        'javascripts/referrer.js',
        'javascripts/products.js',
        'javascripts/jboss-docker.js',
        'javascripts/verify-member.js',
        'javascripts/nav-highlight.js',
        'javascripts/build.js',
        'javascripts/middleware-blog.js',
        'javascripts/scroll-to-top.js',
        'javascripts/footer.js',
        'javascripts/vendor/url-polyfill.min.js',
        'javascripts/vendor/rh-datetime.min.js',
        'javascripts/pdf-links.js',
        'javascripts/show-more.js',
        'javascripts/related-content.js'
    ],
    "styles": ['stylesheets/*.scss']
};

gulp.task('scripts', function() {
    gulp.src(globs.scripts)
    // Uncomment this if you need source maps
    //.pipe(plugins.sourcemaps.init())
    .pipe(plugins.plumber({errorHandler: plugins.notify.onError("Error: <%= error.message %>")}))
    .pipe(plugins.concat('all.js'))
    .pipe(plugins.injectString.prepend('var $ = jQuery;'))
    .pipe(plugins.rename('all.min.js'))
    // Uncomment this if you need source maps
    //.pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('_docker/drupal/drupal-filesystem/web/themes/custom/rhd/js/'));
});

gulp.task('sass', function() {
    gulp.src(globs.styles)
    // Uncomment this if you need source maps
    //.pipe(plugins.sourcemaps.init())
    .pipe(plugins.plumber({errorHandler: plugins.notify.onError("Error: <%= error.message %>")}))
    .pipe(plugins.sass({outputStyle: 'compressed'}))
    .pipe(plugins.sass({outputStyle: 'compressed', functions: {
        'cdn($src)': function(src) {
            return sassUtils.castToSass("url(" + sassUtils.sassString(src).replace(/\.\.\/images\//, '/images/').replace(/\.\/fonts/, '/fonts').replace(/\.\//, '') + ")");
        }
    }}))
    // Uncomment this if you need source maps
    //.pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('_docker/drupal/drupal-filesystem/web/themes/custom/rhd/css/base'));
});

gulp.task('clean', function() {
    return del(['_docker/drupal/drupal-filesystem/web/web/themes/custom/rhd/css/base/*.css',
              '_docker/drupal/drupal-filesystem/web/web/themes/custom/rhd/js/all.min.js']);
});

gulp.task('default', ['clean', 'scripts', 'sass']);

