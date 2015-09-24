import plumber from 'gulp-plumber';
import less from 'gulp-less';
import concat from 'gulp-concat';
import _ from 'lodash';
import minifycss from 'gulp-minify-css';
import watchless from 'gulp-watch-less';
import sourcemaps from 'gulp-sourcemaps';
import gzip from 'gulp-gzip';
import Base from './Base';

export default class Less extends Base {

    constructor(manager, name) {
        super(manager, name);
        
        this.config = {
            gzip: {},
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
            .pipe(!this.isCompress() ? sourcemaps.init() : this.constructor._noop())
            .pipe(less())
            .pipe(concat(this.dest.name + '.css'))
            .pipe(minifycss(this.config.minifycss))
            .pipe(!this.isCompress() ? sourcemaps.write() : this.constructor._noop())
            .pipe(this.gulp.dest(this.dest.dir))
            .pipe(this.isCompress() ? gzip(this.config.gzip) : this.constructor._noop())
            .pipe(this.isCompress() ? this.gulp.dest(this.dest.dir) : this.constructor._noop());

        // @todo clean gzip, if compress is false
    }

    watch() {
        watchless(this.src, {}, function() {
            this.gulp.start(this.name);
        }.bind(this));

        this.gulp.watch(this.src, [this.name]);
    }
    
}
