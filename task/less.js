import plumber from 'gulp-plumber';
import less from 'gulp-less';
import rename from 'gulp-rename';
import _ from 'lodash';
import minifycss from 'gulp-minify-css';
import watchless from 'gulp-watch-less';
import Base from './Base';

export default class Less extends Base {

    constructor(manager, name) {
        super(manager, name);
        
        this.config = {
            minifycss: {
                compatibility: 'ie9'
            }
        };
    }

    init() {
        this.config = _.merge({
            minifycss: {
                target: this.dest.dir,
                relativeTo: this.dest.dir,
                keepBreaks: !this.isCompress()
            }
        }, this.config);
    }

    run() {
        this.gulp.src(this.src)
            .pipe(plumber())
            .pipe(less())
            .pipe(rename(this.dest.name + '.css'))
            .pipe(minifycss(this.config.minifycss))
            .pipe(this.gulp.dest(this.dest.dir));
    }

    watch() {
        watchless(this.src, {}, function() {
            this.gulp.start(this.name);
        }.bind(this));

        this.gulp.watch(this.src, [this.name]);
    }
    
}
