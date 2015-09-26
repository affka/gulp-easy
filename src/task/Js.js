import gutil from 'gulp-util';
import stringify from 'stringify';
import watchify from 'watchify';
import browserify from 'browserify';
import plumber from 'gulp-plumber';
import _ from 'lodash';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import gzip from 'gulp-gzip';
import Base from './Base';

export default class Js extends Base {

    constructor(manager, name) {
        super(manager, name);

        this.config = {
            browserify: {},
            uglify: {},
            transforms: [stringify]
        };
        this._browserify = null;
    }

    init() {
        this._browserify = browserify(_.merge(watchify.args, this.config.browserify, {
            entries: this.src
        }));
        if (this.isWatch()) {
            this._browserify = watchify(this._browserify);
        }

        this._browserify.on('log', gutil.log);

        // Transforms
        _.each(this.config.transforms, function(transform) {
            if (transform === stringify) {
                this._browserify = this._browserify.transform(stringify(['.html', '.htm', '.tmpl', '.tpl', '.hbs', '.ejs']));
            } else {
                this._browserify = this._browserify.transform(transform());
            }
        }.bind(this));
    }

    run() {
        this._bundle();

        // @todo clean gzip, if compress is false
    }

    watch() {
        this._browserify.on('update', this._bundle.bind(this));
    }

    _bundle() {
        return this._browserify.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source(this.dest.name + '.js'))
            .pipe(plumber())
            .pipe(buffer())
            .pipe(!this.isCompress() ? sourcemaps.init() : this.constructor._noop())
            .pipe(this.isCompress() ? uglify(this.config.uglify) : this.constructor._noop())
            .pipe(!this.isCompress() ? sourcemaps.write() : this.constructor._noop())
            .pipe(this.gulp.dest(this.dest.dir))
            .pipe(this.isCompress() ? gzip(this.config.gzip) : this.constructor._noop())
            .pipe(this.isCompress() ? this.gulp.dest(this.dest.dir) : this.constructor._noop());
    }
}
