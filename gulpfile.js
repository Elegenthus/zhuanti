var gulp = require('gulp'),
concat = require('gulp-concat'),
sass = require('gulp-sass'),
uglify = require('gulp-uglify'),
minifyCss = require('gulp-minify-css'),
htmlmin = require('gulp-htmlmin'),
imagemin = require('gulp-imagemin'),
clean = require('gulp-clean'),
babel = require("gulp-babel");

//编译压缩sass 
gulp.task('sass', function () {
    gulp.src('src/sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
        
});

//编译压缩sass并合并css
gulp.task('concatCss', function() {
    gulp.src('src/sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css'));
});

//压缩图片
gulp.task('imagemin', function () {
    gulp.src('src/images/*.{png,jpg,gif,ico,svg}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

// 压缩js
gulp.task('uglifyJs', function() {
    gulp.src('src/js/*.js')
        .pipe(babel()) 
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
        
});

// 压缩并合并js
gulp.task('concatJs', function() {
    gulp.src('src/js/*.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function () {
    gulp.src('dist/css/*.css', {read: false})
        .pipe(clean());
    gulp.src('dist/js/*.js', {read: false})
        .pipe(clean());
    gulp.src('dist/images/*', {read: false})
        .pipe(clean());  
});

gulp.task('watch', function() {
    gulp.watch('src/sass/**', ['sass']);
    gulp.watch('src/js/**', ['uglifyJs']);
    gulp.watch('src/images/**', ['imagemin']);
});

//如果需要合并css和js的话运行gulp concat
gulp.task('concat',['clean','concatCss','concatJs','imagemin','watch']);

//否则只需运行gulp
gulp.task('default',['clean','imagemin','sass','uglifyJs','watch']);