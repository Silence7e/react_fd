'use strict';

var del = require('del');
var eslint = require('gulp-eslint');
var jscs = require('gulp-jscs');
var plumber = require('gulp-plumber');
var sasslint = require('gulp-sass-lint');

module.exports = function(gulp, sources) {
    return gulp.src(sources)
        .pipe(plumber())
        .pipe(jscs())
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('failImmediately'));
}


module.exports = {
    clean: function(gulp, sources, dest, callback, options) {
        return del(dest, options);
    },
    eslint: function(gulp, sources) {
        return gulp.src(sources)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failOnError());
    },
    'copy-static-resource': require('./copy-static-resource'),
    jscs: function(gulp, sources) {
        return gulp.src(sources)
            .pipe(plumber())
            .pipe(jscs())
            .pipe(jscs.reporter())
            .pipe(jscs.reporter('failImmediately'));
    },
    sasslint: function(gulp, sources) {
        return gulp.src(sources)
            .pipe(plumber())
            .pipe(sasslint())
            .pipe(sasslint.format())
            .pipe(sasslint.failOnError());
    },
    webpack: require('./webpack'),
    'webpack-dev-server': require('./webpack-dev-server')
};
