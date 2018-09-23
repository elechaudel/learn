/*
  -- GUIDELINES --
  gulp.task - Define tasks
  gulp.src - Poit to files to use
  gulp.dest - Points to folder output
  gulp.watch - Watch files and folders for changes
*/

var gulp = require('gulp');

// compiling destinations
var SRC = './app/src';
var DIST = './app/dist';

// include plugins
var less = require('gulp-less');
var twig = require('gulp-twig');
var data = require('gulp-data');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var bs = require('browser-sync').create();
var fs = require('fs');
var concat = require('gulp-concat');

gulp.task('browser-sync', function() {
  bs.init({
    server: {
      baseDir: "app/dist/"
    }
  });
});

gulp.task('less', function() {
  return gulp.src(SRC + '/styles/main.less')
  .pipe(less())
  .pipe(gulp.dest(DIST + '/styles'));
});

gulp.task('js-concat', function() {
  return gulp.src(SRC + '/js/**/*.js')
  .pipe(concat('main.js'))
  .pipe(gulp.dest(DIST + '/js'));
});

gulp.task('autoprefix', function(){
  return gulp.src(DIST + '/styles/main.css')
  .pipe(autoprefixer({
    browsers: ['last 2 versions']
  }))
  .pipe(gulp.dest(DIST + '/styles'));
});

gulp.task('minify-img', function() {
  return gulp.src(SRC + '/media/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest(DIST + '/media'))
});

/* compiling twig files from the src directory into html files in the dist directory */
gulp.task('views', function() {
  return gulp.src(SRC + ['/views/**/*.twig'])
  .pipe(data(function(file) {
    return require(SRC + '/data/data.json')
  }))
  .pipe(twig())
  .pipe(gulp.dest(DIST));
});

/* List of files to watch while I'm coding. So I can test my work with BrowserSync in the Dist folder. */
gulp.task('watch', function(){
  gulp.watch(SRC + '/styles/**/*.less', ['less']);
  gulp.watch(SRC + '/templates/**/*.twig', ['views']);
  gulp.watch(SRC + '/views/**/*.twig', ['views']);
  gulp.watch(SRC + '/js/**/*.js', ['js-concat']);
  gulp.watch(SRC + '/data/data.json', ['views']);
  // add a task to watch new images in the media folder

})

/* Just call gulp in your terminal to run the default task. I use this command to build my project */
gulp.task('default', ['views', 'less', 'autoprefix', 'minify-img', 'js-concat']);

/* For TEST build change config.root in data.json to "/" */
/* For PROD build change config.root in data.json to "https://elechaudel.github.io/learn/app/dist/" */
