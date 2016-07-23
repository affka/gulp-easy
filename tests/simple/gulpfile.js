require('../../src/index')(require('gulp'))
    .less('less/index.less')
    .js('js/**/*.js', 'public/js/main.js')
    .files('images/**/*', 'public/images/')
    .task((gulp, taskName, isCompress, isWatch) => {
        gulp.src(['images/*']).pipe(gulp.dest('public/images2/'));
    }, (gulp, taskName, isCompress) => {
        gulp.watch(['images/*'], [taskName]);
    })