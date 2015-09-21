require('gulp-easy')
    .less('less/index.less')
    .js('js/**/*.js', 'public/js/main.js')
    .files('images/**/*', 'public/images/')
    .task(function(gulp, taskName, isCompress, isWatch) {
        gulp.src(['images/*']).pipe(gulp.dest('public/images2/'));
    }, function(gulp, taskName, isCompress) {
        gulp.watch(['images/*'], [taskName]);
    });