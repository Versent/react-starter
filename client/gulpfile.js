'use strict';

var fs       = require('fs');
var gulp     = require('gulp');
var mocha    = require('gulp-mocha');
var shell    = require('gulp-shell')
var path     = require('path');
var watch    = require('gulp-watch');
var batch    = require('gulp-batch');
var plumber  = require('gulp-plumber');

require('babel/register');
require('coffee-script/register');

var feTestCmd = 'make test-unit';
var feTestArgs = {
	ignoreErrors: true
}

gulp.task('test', function(cb) {
	gulp.src('')
		.pipe(shell(feTestCmd, feTestArgs));
});

gulp.task('test-watch', function() {
	gulp
		.src('')
		.pipe(watch('src/**'))
		.pipe(shell(feTestCmd, feTestArgs));
});
