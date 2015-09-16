var fs       = require('fs')
var gulp     = require('gulp')
var jscs     = require('gulp-jscs')
var path     = require('path')
var shell    = require('gulp-shell')
var watch    = require('gulp-watch')

// require('babel/register');

gulp.task('test', shell.task([
  'npm test',
]))

gulp.task('test-watch', ['test'], function() {
  gulp.watch(['src/**/*.js'], ['test'])
})

gulp.task('lint', function() {
  return gulp.src(['src/**/*.js', 'src/**/*.jsx'])
    .pipe(jscs())
})
