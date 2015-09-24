'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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

        _get(Object.getPrototypeOf(Less.prototype), 'constructor', this).call(this, manager, name);

        this.config = {
            gzip: {},
            minifycss: {
                compatibility: 'ie9'
            }
        };
    }

    _createClass(Less, [{
        key: 'init',
        value: function init() {
            this.config = _lodash2['default'].merge({
                minifycss: {
                    target: this.dest.dir,
                    relativeTo: this.dest.dir,
                    keepBreaks: !this.isCompress()
                }
            }, this.config);
        }
    }, {
        key: 'run',
        value: function run() {
            this.gulp.src(this.src).pipe((0, _gulpPlumber2['default'])()).pipe(!this.isCompress() ? _gulpSourcemaps2['default'].init() : this.constructor._noop()).pipe((0, _gulpLess2['default'])()).pipe((0, _gulpConcat2['default'])(this.dest.name + '.css')).pipe((0, _gulpMinifyCss2['default'])(this.config.minifycss)).pipe(!this.isCompress() ? _gulpSourcemaps2['default'].write() : this.constructor._noop()).pipe(this.gulp.dest(this.dest.dir)).pipe(this.isCompress() ? (0, _gulpGzip2['default'])(this.config.gzip) : this.constructor._noop()).pipe(this.isCompress() ? this.gulp.dest(this.dest.dir) : this.constructor._noop());

            // @todo clean gzip, if compress is false
        }
    }, {
        key: 'watch',
        value: function watch() {
            (0, _gulpWatchLess2['default'])(this.src, {}, (function () {
                this.gulp.start(this.name);
            }).bind(this));

            this.gulp.watch(this.src, [this.name]);
        }
    }]);

    return Less;
})(_Base3['default']);

exports['default'] = Less;
module.exports = exports['default'];