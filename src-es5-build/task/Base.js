'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _through2 = require('through2');

var _through22 = _interopRequireDefault(_through2);

var Base = (function () {
  _createClass(Base, null, [{
    key: '_noop',
    value: function _noop() {
      return _through22['default'].obj(function (file, enc, cb) {
        this.push(file);
        cb();
      });
    }
  }]);

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

  _createClass(Base, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'run',
    value: function run() {}
  }, {
    key: 'isWatch',
    value: function isWatch() {
      return this.manager.isWatch();
    }
  }, {
    key: 'isCompress',
    value: function isCompress() {
      return this.manager.isCompress();
    }
  }]);

  return Base;
})();

exports['default'] = Base;
module.exports = exports['default'];