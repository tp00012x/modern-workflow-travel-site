const gulp = require('gulp');
const watch = require('gulp-watch');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssvars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssImport = require('postcss-import');
const browserSync = require('browser-sync').create();

gulp.task('default', function () {
   console.log('Hooray');
});

gulp.task('html', function () {
    console.log('Html Loaded');
});

gulp.task('styles', function () {
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
        .pipe(gulp.dest('./app/temp/styles'))
});

gulp.task('watch', function () {

    browserSync.init({
       server: {
           baseDir: 'app'
       }
    });

   watch('./app/index.html', function () {
       browserSync.reload();
   });

    watch('./app/assets/styles/**/*.css', function () {
        gulp.start('cssInject');
    })
});

gulp.task('cssInject', ['styles'], function () {
   return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream())
});
