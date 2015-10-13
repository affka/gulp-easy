'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _through2 = require('through2');

var _through22 = _interopRequireDefault(_through2);

var Base = (function () {
  Base._noop = function _noop() {
    return _through22['default'].obj(function (file, enc, cb) {
      this.push(file);
      cb();
    });
  };

  function Base(gulp, manager, name) {
    _classCallCheck(this, Base);

    /**
     * @type {module:gulp}
     */
    this.gulp = gulp;

    /**
     * @type {Manager}
     */
    this.manager = manager;

    /**
     * @type {string}
     */
    this.name = name;

    /**
     * @type {string[]}
     */
    this.src = null;

    /**
     * @type {{dir: string, file: string, ext: string, name: string}}
     */
    this.dest = null;

    /**
     * @type {object}
     */
    this.config = {};
  }

  Base.prototype.init = function init() {};

  Base.prototype.run = function run() {};

  Base.prototype.isWatch = function isWatch() {
    return this.manager.isWatch();
  };

  Base.prototype.isCompress = function isCompress() {
    return this.manager.isCompress();
  };

  return Base;
})();

exports['default'] = Base;
module.exports = exports['default'];