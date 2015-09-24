'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Manager = require('./Manager');

var _Manager2 = _interopRequireDefault(_Manager);

exports['default'] = function (gulp) {
    return new _Manager2['default'](gulp);
};

;
module.exports = exports['default'];