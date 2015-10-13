'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

var Files = (function (_Base) {
    _inherits(Files, _Base);

    function Files() {
        _classCallCheck(this, Files);

        _Base.apply(this, arguments);
    }

    Files.prototype.run = function run() {
        this.gulp.src(this.src).pipe(this.gulp.dest(this.dest.dir));
    };

    Files.prototype.watch = function watch() {
        this.gulp.watch(this.src, [this.name]);
    };

    return Files;
})(_Base3['default']);

exports['default'] = Files;
module.exports = exports['default'];