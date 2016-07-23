var Base = require('./Base');

class Files extends Base {

    run() {
        this.gulp.src(this.src).pipe(this.gulp.dest(this.dest.dir));
    }

    watch() {
        this.gulp.watch(this.src, [this.name]);
    }
    
}

module.exports = Files;