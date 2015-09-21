import Base from './Base';

export default class Files extends Base {

    constructor(manager, name) {
        super(manager, name);
    }

    run() {
        this.gulp.src(this.src).pipe(this.gulp.dest(this.dest.dir));
    }

    watch() {
        this.gulp.watch(this.src, [this.name]);
    }
    
}
