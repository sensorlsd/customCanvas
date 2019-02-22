const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const gulp = require('gulp');
const webpack = require('webpack');
const {argv} = require('yargs');

const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const defaultTasks = [];

const BUILD_DIR = path.join(__dirname, argv.output || 'dist');
const OUTPUT_DIR = path.join(__dirname, "..", "server", "public", "automation");

gulp.task('build:clean', done => rimraf(BUILD_DIR, () => mkdirp(BUILD_DIR, done)));


gulp.task('compile', ['build:clean'], () => gulp.src('src/index.ts')
    .pipe(webpackStream(webpackConfig, webpack))
    .on('error', () => {
        setTimeout(() => process.exit(1), 1000);
    })// Recover from errors
    .pipe(gulp.dest(BUILD_DIR))
);

gulp.task('default', ['compile'], () => gulp.src(`${BUILD_DIR}/**/*`).pipe(gulp.dest(OUTPUT_DIR)));

