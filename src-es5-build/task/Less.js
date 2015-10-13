'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

var _gulpLess = require('gulp-less');

var _gulpLess2 = _interopRequireDefault(_gulpLess);

var _gulpConcat = require('gulp-concat');

var _gulpConcat2 = _interopRequireDefault(_gulpConcat);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gulpMinifyCss = require('gulp-minify-css');

var _gulpMinifyCss2 = _interopRequireDefault(_gulpMinifyCss);

var _gulpWatchLess = require('gulp-watch-less');

var _gulpWatchLess2 = _interopRequireDefault(_gulpWatchLess);

var _gulpSourcemaps = require('gulp-sourcemaps');

var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);

var _gulpGzip = require('gulp-gzip');

var _gulpGzip2 = _interopRequireDefault(_gulpGzip);

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

var Less = (function (_Base) {
    _inherits(Less, _Base);

    function Less(manager, name) {
        _classCallCheck(this, Less);

        _Base.call(this, manager, name);

        this.config = {
            gzip: {},
            minifycss: {
                compatibility: 'ie9'
            }
        };
    }

    Less.prototype.init = function init() {
        this.config = _lodash2['default'].merge({
            minifycss: {
                target: this.dest.dir,
                relativeTo: this.dest.dir,
                keepBreaks: !this.isCompress()
            }
        }, this.config);
    };

    Less.prototype.run = function run() {
        this.gulp.src(this.src).pipe(_gulpPlumber2['default']()).pipe(!this.isCompress() ? _gulpSourcemaps2['default'].init() : this.constructor._noop()).pipe(_gulpLess2['default']()).pipe(_gulpConcat2['default'](this.dest.name + '.css')).pipe(_gulpMinifyCss2['default'](this.config.minifycss)).pipe(!this.isCompress() ? _gulpSourcemaps2['default'].write() : this.constructor._noop()).pipe(this.gulp.dest(this.dest.dir)).pipe(this.isCompress() ? _gulpGzip2['default'](this.config.gzip) : this.constructor._noop()).pipe(this.isCompress() ? this.gulp.dest(this.dest.dir) : this.constructor._noop());

        // @todo clean gzip, if compress is false
    };

    Less.prototype.watch = function watch() {
        _gulpWatchLess2['default'](this.src, {}, (function () {
            this.gulp.start(this.name);
        }).bind(this));

        this.gulp.watch(this.src, [this.name]);
    };

    return Less;
})(_Base3['default']);

exports['default'] = Less;
module.exports = exports['default'];