var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var concatCss = require('gulp-concat-css');

gulp.task('devjs', function(){
   return gulp.src('public/javascripts/src/*.js')
       .pipe(concat('test-watch.js'))
       .pipe(gulp.dest('public/javascripts'));
});

gulp.task('depsjs', function(){
    console.log('run depsjs')
    return gulp.src(['node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'public/javascripts/src/controller.js'])
        .pipe(concat('deps.js'))
        .pipe(gulp.dest('public/javascripts/dist'));
});

gulp.task('depsDist', function(){
    return gulp.src(['public/javascripts/deps.js'])
        .pipe(rename('deps.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts'))
})


gulp.task('sass', function(){
    console.log('sass');
    return gulp.src(['public/css/src/style.scss'])
       .pipe(sass())
       .pipe(gulp.dest('public/css/src'));

});

gulp.task('concat-css', function(){
    console.log('concat-css');
    return gulp.src(['public/css/src/style.css',
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'])
        .pipe(concatCss('style.css'))
        .pipe(gulp.dest('public/css/dist'));
});

gulp.task('sass-watch', ['sass', 'concat-css']/*, browserSync.reload*/);

gulp.task('watch', function(){
    /*
    browserSync({
        server: {
            baseDir: 'public'
        }
    });*/
    gulp.watch('public/javascripts/src/*.js', ['depsjs']);
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
