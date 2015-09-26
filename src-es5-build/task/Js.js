'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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

        _get(Object.getPrototypeOf(Js.prototype), 'constructor', this).call(this, manager, name);

        this.config = {
            browserify: {},
            uglify: {},
            transforms: [_stringify2['default']]
        };
        this._browserify = null;
    }

    _createClass(Js, [{
        key: 'init',
        value: function init() {
            this._browserify = (0, _browserify2['default'])(_lodash2['default'].merge(_watchify2['default'].args, this.config.browserify, {
                entries: this.src
            }));
            if (this.isWatch()) {
                this._browserify = (0, _watchify2['default'])(this._browserify);
            }

            this._browserify.on('log', _gulpUtil2['default'].log);

            // Transforms
            _lodash2['default'].each(this.config.transforms, (function (transform) {
                if (transform === _stringify2['default']) {
                    this._browserify = this._browserify.transform((0, _stringify2['default'])(['.html', '.htm', '.tmpl', '.tpl', '.hbs', '.ejs']));
                } else {
                    this._browserify = this._browserify.transform(transform());
                }
            }).bind(this));
        }
    }, {
        key: 'run',
        value: function run() {
            this._bundle();

            // @todo clean gzip, if compress is false
        }
    }, {
        key: 'watch',
        value: function watch() {
            this._browserify.on('update', this._bundle.bind(this));
        }
    }, {
        key: '_bundle',
        value: function _bundle() {
            return this._browserify.bundle().on('error', _gulpUtil2['default'].log.bind(_gulpUtil2['default'], 'Browserify Error')).pipe((0, _vinylSourceStream2['default'])(this.dest.name + '.js')).pipe((0, _gulpPlumber2['default'])()).pipe((0, _vinylBuffer2['default'])()).pipe(!this.isCompress() ? _gulpSourcemaps2['default'].init() : this.constructor._noop()).pipe(this.isCompress() ? (0, _gulpUglify2['default'])(this.config.uglify) : this.constructor._noop()).pipe(!this.isCompress() ? _gulpSourcemaps2['default'].write() : this.constructor._noop()).pipe(this.gulp.dest(this.dest.dir)).pipe(this.isCompress() ? (0, _gulpGzip2['default'])(this.config.gzip) : this.constructor._noop()).pipe(this.isCompress() ? this.gulp.dest(this.dest.dir) : this.constructor._noop());
        }
    }]);

    return Js;
})(_Base3['default']);

exports['default'] = Js;
module.exports = exports['default'];