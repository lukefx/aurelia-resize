'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var rimraf = require('gulp-rimraf');
var merge = require('merge2');

var paths = {
  source: "source/",
  output: "dist/",
  spec: "spec/"
}

gulp.task('clean', function () {
  return gulp.src([paths.output ], { read: false })
    .pipe(rimraf());
});

gulp.task('compile', ['clean'], function () {
  var project = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
  });

  var tsResult =  gulp.src([paths.source + '**/*.ts', "typings/*.d.ts"])
    .pipe(project());

  return merge([
    tsResult.dts.pipe(gulp.dest(paths.output)),
    tsResult.js.pipe(gulp.dest(paths.output))
  ]);
});