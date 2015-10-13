'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

var Inline = (function (_Base) {
    _inherits(Inline, _Base);

    function Inline(manager, name) {
        _classCallCheck(this, Inline);

        _Base.call(this, manager, name);

        this.taskHandler = null;
        this.watchHandler = null;
    }

    Inline.prototype.run = function run() {
        if (_lodash2['default'].isFunction(this.taskHandler)) {
            this.taskHandler.call(null, this.gulp, this.name, this.isCompress(), this.isWatch());
        }
    };

    Inline.prototype.watch = function watch() {
        if (_lodash2['default'].isFunction(this.watchHandler)) {
            this.watchHandler.call(null, this.gulp, this.name, this.isCompress(), this.isWatch());
        }
    };

    return Inline;
})(_Base3['default']);

exports['default'] = Inline;
module.exports = exports['default'];