/**
 * Created by zhang on 2017/6/13.
 */
var gulp        = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var webpackConfig = require('./webpack.config');
var webpack = require('webpack-stream');

var server = {
    baseDir: ['examples', './']
};

// Static server
gulp.task('browser-sync', function() {
    var files = [
        'dist/**/*',
        'examples/**/*'
    ];
    browserSync.init(files, {
        server: server
    });
});

gulp.task('webpack', function () {
    return gulp.src('src/pagination.js')
        .pipe(webpack(webpackConfig, require('webpack')))
        .pipe(rename('pagination.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*', ['webpack']);
});

gulp.task('pack', ['webpack'], function () {
    return gulp.src('dist/pagination.js')
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('default',['webpack', 'browser-sync', 'watch']); //定义默认任务