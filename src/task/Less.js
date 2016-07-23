var plumber = require('gulp-plumber');
var less = require('gulp-less');
var concat = require('gulp-concat');
var _ = require('lodash');
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var gzip = require('gulp-gzip');
var watchLess = require('gulp-watch-less2');
var Base = require('./Base');

class Less extends Base {

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
            },
            less: {
            }
        }, this.config);
    }

    run() {
        var stream = this.gulp.src(this.src)
            .pipe(plumber());

        if (this.isWatch()) {
            _.each(_.toArray(this.src), srcItem => {
                stream = stream.pipe(watchLess(srcItem));
            });
        }

        stream
            .pipe(!this.isCompress() ? sourcemaps.init() : this.constructor._noop())
            .pipe(less(this.config.less))
            .pipe(concat(this.dest.name + '.css'))
            .pipe(minifycss(this.config.minifycss))
            .pipe(!this.isCompress() ? sourcemaps.write() : this.constructor._noop())
            .pipe(this.gulp.dest(this.dest.dir))
            .pipe(this.isCompress() ? gzip(this.config.gzip) : this.constructor._noop())
            .pipe(this.isCompress() ? this.gulp.dest(this.dest.dir) : this.constructor._noop());

        // @todo clean gzip, if compress is false
    }

}

module.exports = Less;