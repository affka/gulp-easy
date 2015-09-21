require('gulp-easy')
    .less('less/index.less')
    .js('js/**/*.js', 'public/js/main.js')
    .files('images/**/*', 'public/images/')