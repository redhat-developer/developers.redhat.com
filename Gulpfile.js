"use strict";
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var sass = require("node-sass");
var sassUtils = require("node-sass-utils")(sass);
var jasmine = require('gulp-jasmine');
var watch = require('gulp-watch');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("frontend/tsconfig.json");
var eslint = require('gulp-eslint');
var gulpIf = require('gulp-if');

var rollup = require('rollup').rollup;
var typescript2 = require('rollup-plugin-typescript2');

var globs = {
  // TODO: Need to find a fix for adobe analytics
    "scripts": [
        '!javascripts/namespace.js',
        'javascripts/drupal-namespace.js',
        'javascripts/foundation/foundation.js',
        'javascripts/foundation/foundation.accordion.js',
        'javascripts/foundation/foundation.dropdown.js',
        'javascripts/foundation/foundation.equalizer.js',
        'javascripts/foundation/foundation.reveal.js',
        'javascripts/foundation/foundation.tab.js',
        'javascripts/foundation/foundation.tooltip.js',
        'javascripts/vendor/chosen.jquery.min.js',
        'javascripts/vendor/class.create.js',
        'javascripts/vendor/highlight-init.js',
        'javascripts/vendor/highlight.min.js',
        'javascripts/vendor/includes.js',
        'javascripts/vendor/jquery-encoder-0.1.0.js',
        'javascripts/vendor/jquery.filedownload.js',
        'javascripts/vendor/jquery.paging.min.js',
        'javascripts/vendor/jquery.resize.js',
        'javascripts/vendor/jquery.timeago.js',
        'javascripts/vendor/jquery.xdomainrequest.js',
        'javascripts/vendor/keycloak.js',
        'javascripts/vendor/modernizr-custom.js',
        'javascripts/vendor/moment.js',
        'javascripts/vendor/picker.js',
        'javascripts/vendor/picker.date.js',
        'javascripts/vendor/polyfiller.js',
        'javascripts/vendor/socialite.min.js',
        'javascripts/vendor/swipe.js',
        'javascripts/vendor/ytembed.js',
        'javascripts/extensions.js',
        'javascripts/a-b-testing.js',
        'javascripts/adaptive-placeholder.js',
        'javascripts/book-download.js',
        'javascripts/books.js',
        'javascripts/buzz.js',
        'javascripts/carousel.js',
        'javascripts/connectors.js',
        'javascripts/contributors-quiz.js',
        'javascripts/custom-jira-collector.js',
        'javascripts/datepicker-init.js',
        'javascripts/dcp.js',
        'javascripts/developer-materials.angular.js',
        'javascripts/devnation2015.js',
        'javascripts/downloads.js',
        'javascripts/events.js',
        'javascripts/jboss-docker.js',
        'javascripts/jdfadvise.js',
        'javascripts/jquery-deparam.js',
        'javascripts/latest.js',
        'javascripts/microsite.js',
        'javascripts/mobile.js',
        'javascripts/os-filter.js',
        'javascripts/overlay.js',
        'javascripts/polyfiller-init.js',
        'javascripts/product-forums.js',
        'javascripts/products.js',
        'javascripts/projects.js',
        'javascripts/rating.js',
        'javascripts/referrer.js',
        'javascripts/search.js',
        'javascripts/social.js',
        'javascripts/sso.js',
        'javascripts/stackoverflow.js',
        'javascripts/tabs.js',
        'javascripts/terms-and-conditions.js',
        'javascripts/topics.js',
        'javascripts/video.js',
        'javascripts/visual.js',
        'javascripts/vjbug-jira-collector.js',
        'javascripts/vjbug.js'
        //'javascripts/current-tab.js',
    ],
    "styles": ['frontend/src/css/**/*.*css']
};

gulp.task('rollup', function () {
    return rollup({
        entry: 'frontend/src/ts/main.ts',
        plugins: [
            typescript2({clean: true, cacheRoot: 'frontend/.ts_cache'})
        ]
    }).then(function (bundle) {
        return bundle.write({
            format: 'iife',
            dest: 'frontend/dist/js/main.js'
        });
    });
});

gulp.task('scripts', function() {
    gulp.src(globs.scripts)
    // Uncomment this if you need source maps
    //.pipe(plugins.sourcemaps.init())
    .pipe(plugins.plumber({
        errorHandler: plugins.notify.onError("Error: <%= error.message %>")
    }))
    .pipe(plugins.concat('all.js'))
    .pipe(plugins.injectString.prepend('var $ = jQuery;'))
    .pipe(plugins.rename('all.min.js'))
    // Uncomment this if you need source maps
    //.pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('_docker/drupal/drupal-filesystem/web/themes/custom/rhd/js/'));
});

gulp.task('scripts:watch', function() {
    gulp.watch(globs.scripts, ['scripts']);
})

gulp.task('styles', function() {
    gulp.src(globs.styles)
    // Uncomment this if you need source maps
    //.pipe(plugins.sourcemaps.init())
    .pipe(plugins.plumber({
        errorHandler: plugins.notify.onError("Error: <%= error.message %>")
    }))
    .pipe(plugins.sass({outputStyle: 'compressed'}))
    .pipe(plugins.sass({outputStyle: 'compressed', functions: {
        'cdn($src)': function(src) {
            return sassUtils.castToSass("url(" + sassUtils.sassString(src)
            .replace(/\.\.\/images\//, '/images/')
            .replace(/\.\/fonts/, '/fonts')
            .replace(/\.\//, '') + ")");
        }
    }}))
    // Uncomment this if you need source maps
    //.pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('_docker/drupal/drupal-filesystem/web/themes/custom/rhd/css/base'));
});

gulp.task('styles:watch', function () {
    gulp.watch(globs.styles, ['sass']);
});

gulp.task('jasmine', function() {
    var filesForTest = 'frontend/spec/**/*_spec.js';
    return gulp.src(filesForTest)
    .pipe(jasmine());
});

gulp.task('test', ['lint', 'jasmine']);

gulp.task("ts", function () {
    return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("frontend/dist"));
});

gulp.task('lint', function() {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src([
        'frontend/js/**/*.js',
        '!frontend/js/foundation/**',
        '!frontend/js/vendor/**'
    ])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint({fix: true}))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        .pipe(gulp.dest('frontend/dist/js'))
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

function isFixed(file) {
	// Has ESLint fixed the file contents?
    return file.eslint !== null && file.eslint.fixed;
}

gulp.task('lint-n-fix', function() {
    return gulp.src([
        'frontend/js/**/*.js',
        '!frontend/js/foundation/**',
        '!frontend/js/vendor/**'
    ])
    .pipe(eslint({fix: true}))
    .pipe(eslint.format())
    // if fixed, write the file to dest
    .pipe(gulpIf(isFixed, gulp.dest('frontend/dist/js')));
});

gulp.task('clean', function() {
    return del(['_docker/drupal/drupal-filesystem/web/web/themes/custom/rhd/css/base/*.css',
        '_docker/drupal/drupal-filesystem/web/web/themes/custom/rhd/js/all.min.js']);
});

gulp.task('default', ['clean', 'test', 'scripts', 'styles']);

