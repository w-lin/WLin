var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

gulp.task('devjs', function(){
   return gulp.src('public/javascripts/src/*.js')
       .pipe(concat('test-watch.js'))
       .pipe(gulp.dest('public/javascripts'));
});

gulp.task('depsjs', function(){
    return gulp.src(['node_modules/angular/angular.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'public/javascripts/controller.js'])
        .pipe(concat('deps.js'))
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('depsDist', function(){
    return gulp.src(['public/javascripts/deps.js'])
        .pipe(rename('deps.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts'))
})


gulp.task('sass', function(){
   return gulp.src(['public/css/src/style.scss'])
       .pipe(sass())
       .pipe(gulp.dest('public/css'))
});

gulp.task('sass-watch', ['sass'], browserSync.reload);

gulp.task('watch', function(){
    browserSync({
        server: {
            baseDir: 'public'
        }
    });
    gulp.watch('public/javascripts/src/*.js', ['devjs']);
    gulp.watch('public/css/src/*.scss', ['sass-watch']);
});

gulp.task('default', function(callback){
    runSequence('depsjs', 'depsDist', callback);
});

gulp.task('browser-sync', ['nodemon'], function() {


    console.log('eeeeeeeeeeee');
    gulp.watch('public/javascripts/src/*.js', ['devjs']);
    gulp.watch('public/css/src/*.scss', ['sass'])
    
    browserSync.init(null, {
        proxy: "http://localhost:5000",
       // files: ["public/**/*.*"],
        files: ["public/css/src/*.*"],
        browser: "google chrome",
        port: 3001,
    });

});

gulp.task('nodemon', function (cb) {

    var started = false;

    return nodemon({
        script: 'bin/www'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});
