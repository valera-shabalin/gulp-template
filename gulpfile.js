const gulp = require('gulp'),
      sass = require('gulp-sass'),
      browserSync = require('browser-sync'),
      cleanCSS = require('gulp-clean-css')

gulp.task('sass', function(){
    return gulp.src('app/scss/main.scss')
        .pipe(sass())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('js', function() {
    return gulp.src(['app/js/common.js', 'app/libs/**/*.js'])
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('html', function() {
    return gulp.src('app/**/*.html')
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    })
})

gulp.task('watch', () => {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'))
    gulp.watch('app/**/*.html', gulp.parallel('html'))
    gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('js'))
})

gulp.task('serve', gulp.parallel('sass', 'browser-sync', 'watch'))