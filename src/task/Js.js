var gutil = require('gulp-util');
var stringify = require('stringify');
var watchify = require('watchify');
var browserify = require('browserify');
var plumber = require('gulp-plumber');
var _ = require('lodash');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var babelify = require('babelify');
var babelpresetreact = require('babel-preset-react');
var babelpresetes2015 = require('babel-preset-es2015');
var babelpresetes2015PresetCommonJs = require("babel-plugin-transform-es2015-modules-commonjs");
var babelpresetes2016 = require('babel-preset-es2016');
var Base = require('./Base');

class Js extends Base {

    constructor(manager, name) {
        super(manager, name);

        this.config = {
            browserify: {},
            uglify: {},
            transforms: [stringify],
            jsx: false,
            es2015: true,
            es2016: false
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

        // Presets
        var presets = [];
        if (this.config.jsx) {
            presets.push(babelpresetreact);
        }
        if (this.config.es2015) {
            _.each(babelpresetes2015.plugins, (preset, i) => {
                if (preset === babelpresetes2015PresetCommonJs || (_.isArray(preset) && preset[0] === babelpresetes2015PresetCommonJs)) {
                    babelpresetes2015.plugins[i] = [
                        require("babel-plugin-transform-es2015-modules-commonjs"),
                        _.extend(_.isArray(preset) ? preset[1] : {}, {allowTopLevelThis: true})
                    ];
                }
            });
            presets.push(babelpresetes2015);
        }
        if (this.config.es2016) {
            presets.push(babelpresetes2016);
        }
        if (presets.length > 0) {
            this.config.transforms.push([
                babelify.configure({
                    compact: false,
                    presets: presets
                }),
                {
                    global: true,
                    extensions: ['.jsx']
                }
            ]);
        }

        // Transforms
        _.each(this.config.transforms, function(transform) {
            if (transform === stringify) {
                this._browserify = this._browserify.transform(stringify(['.html', '.htm', '.tmpl', '.tpl', '.hbs', '.ejs']));
            } else if (_.isArray(transform)) {
                this._browserify = this._browserify.transform.apply(this._browserify, transform);
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

module.exports = Js;
