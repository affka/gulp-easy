'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _stringify = require('stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _watchify = require('watchify');

var _watchify2 = _interopRequireDefault(_watchify);

var _browserify = require('browserify');

var _browserify2 = _interopRequireDefault(_browserify);

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _vinylSourceStream = require('vinyl-source-stream');

var _vinylSourceStream2 = _interopRequireDefault(_vinylSourceStream);

var _vinylBuffer = require('vinyl-buffer');

var _vinylBuffer2 = _interopRequireDefault(_vinylBuffer);

var _gulpSourcemaps = require('gulp-sourcemaps');

var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);

var _gulpUglify = require('gulp-uglify');

var _gulpUglify2 = _interopRequireDefault(_gulpUglify);

var _gulpGzip = require('gulp-gzip');

var _gulpGzip2 = _interopRequireDefault(_gulpGzip);

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

var Js = (function (_Base) {
    _inherits(Js, _Base);

    function Js(manager, name) {
        _classCallCheck(this, Js);

        _Base.call(this, manager, name);

        this.config = {
            browserify: {},
            uglify: {},
            transforms: [_stringify2['default']]
        };
        this._browserify = null;
    }

    Js.prototype.init = function init() {
        this._browserify = _browserify2['default'](_lodash2['default'].merge(_watchify2['default'].args, this.config.browserify, {
            entries: this.src
        }));
        if (this.isWatch()) {
            this._browserify = _watchify2['default'](this._browserify);
        }

        this._browserify.on('log', _gulpUtil2['default'].log);

        // Transforms
        _lodash2['default'].each(this.config.transforms, (function (transform) {
            if (transform === _stringify2['default']) {
                this._browserify = this._browserify.transform(_stringify2['default'](['.html', '.htm', '.tmpl', '.tpl', '.hbs', '.ejs']));
            } else {
                this._browserify = this._browserify.transform(transform());
            }
        }).bind(this));
    };

    Js.prototype.run = function run() {
        this._bundle();

        // @todo clean gzip, if compress is false
    };

    Js.prototype.watch = function watch() {
        this._browserify.on('update', this._bundle.bind(this));
    };

    Js.prototype._bundle = function _bundle() {
        return this._browserify.bundle().on('error', _gulpUtil2['default'].log.bind(_gulpUtil2['default'], 'Browserify Error')).pipe(_vinylSourceStream2['default'](this.dest.name + '.js')).pipe(_gulpPlumber2['default']()).pipe(_vinylBuffer2['default']()).pipe(!this.isCompress() ? _gulpSourcemaps2['default'].init() : this.constructor._noop()).pipe(this.isCompress() ? _gulpUglify2['default'](this.config.uglify) : this.constructor._noop()).pipe(!this.isCompress() ? _gulpSourcemaps2['default'].write() : this.constructor._noop()).pipe(this.gulp.dest(this.dest.dir)).pipe(this.isCompress() ? _gulpGzip2['default'](this.config.gzip) : this.constructor._noop()).pipe(this.isCompress() ? this.gulp.dest(this.dest.dir) : this.constructor._noop());
    };

    return Js;
})(_Base3['default']);

exports['default'] = Js;
module.exports = exports['default'];