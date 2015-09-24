'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

// Tasks

var _taskFiles = require('./task/Files');

var _taskFiles2 = _interopRequireDefault(_taskFiles);

var _taskLess = require('./task/Less');

var _taskLess2 = _interopRequireDefault(_taskLess);

var _taskJs = require('./task/Js');

var _taskJs2 = _interopRequireDefault(_taskJs);

var _taskInline = require('./task/Inline');

var _taskInline2 = _interopRequireDefault(_taskInline);

var Manager = (function () {

    /**
     *
     * @param g
     */

    function Manager(g) {
        _classCallCheck(this, Manager);

        this._config = {
            dest: 'public',
            name: 'app',
            compress: null,
            watch: null
        };

        this._names = [];
        this._nameIndexes = {};
        this._tasks = [];
        this._isProduction = !!_yargs2['default'].argv.production || _yargs2['default'].argv._.indexOf('production') !== -1;

        this._gulp = g || _gulp2['default'];
        this._gulp.task('default', this._tasks);
        this._gulp.task('production', this._tasks);

        // Do not exit on exceptions
        if (!this._isProduction) {
            process.on('uncaughtException', function (e) {
                console.error(e.stack || String(e));
            });
        }
    }

    /**
     *
     * @param {object} config
     * @returns {self}
     */

    _createClass(Manager, [{
        key: 'config',
        value: function config(_config) {
            if (_config.gulp) {
                this._gulp = _config.gulp;
            }

            _lodash2['default'].merge(this._config, _config);
            return this;
        }
    }, {
        key: 'isWatch',
        value: function isWatch() {
            return this._config.watch !== null ? this._config.watch : !this._isProduction;
        }
    }, {
        key: 'isCompress',
        value: function isCompress() {
            return this._config.compress !== null ? this._config.compress : this._isProduction;
        }

        /**
         *
         * @param {string|string[]} src
         * @param {string} [dest] Path to destination file
         * @param {object} [config]
         * @returns {self}
         */
    }, {
        key: 'files',
        value: function files(src, dest, config) {
            var task = new _taskFiles2['default']();
            task.src = this._normalizeSrc(src);
            task.dest = this._parseDest(dest, !dest.match(/\/$/));
            task.config = _lodash2['default'].merge(task.config, this._config.files || {}, config || {});
            task.name = this._getTaskName(task.dest.name + '_files');
            this._runTask(task);

            return this;
        }

        /**
         *
         * @param {string|string[]} src
         * @param {string} [dest] Path to destination file
         * @param {object} [config]
         * @returns {self}
         */
    }, {
        key: 'less',
        value: function less(src, dest, config) {
            var task = new _taskLess2['default']();
            task.src = this._normalizeSrc(src);
            task.dest = this._parseDest(dest, true, 'css');
            task.config = _lodash2['default'].merge(task.config, this._config.less || {}, config || {});
            task.name = this._getTaskName(task.dest.name + '_css');
            this._runTask(task);

            return this;
        }

        /**
         *
         * @param {string|string[]} src
         * @param {string} [dest] Path to destination file
         * @param {object} [config]
         * @returns {self}
         */
    }, {
        key: 'js',
        value: function js(src, dest, config) {
            var task = new _taskJs2['default']();
            task.src = this._normalizeSrc(src);
            task.dest = this._parseDest(dest, true, 'js');
            task.config = _lodash2['default'].merge(task.config, this._config.js || {}, config || {});
            task.name = this._getTaskName(task.dest.name + '_js');
            this._runTask(task);

            return this;
        }

        /**
         *
         * @param {function} taskHandler
         * @param {function} [watchHandler]
         * @returns {self}
         */
    }, {
        key: 'task',
        value: function task(taskHandler, watchHandler) {
            var task = new _taskInline2['default']();
            task.taskHandler = taskHandler;
            task.watchHandler = watchHandler || null;
            task.name = this._getTaskName('task');
            this._runTask(task);

            return this;
        }
    }, {
        key: '_getTaskName',
        value: function _getTaskName(name) {
            name = '_' + name;
            if (this._names.indexOf(name) !== -1) {
                if (name.match(/[0-9]$/)) {
                    name = name.replace(/[0-9]+$/, function (num) {
                        return parseInt(num) + 1;
                    });
                } else {
                    name = name + '2';
                }
            }

            this._names.push(name);
            return name;
        }
    }, {
        key: '_runTask',
        value: function _runTask(task) {
            task.manager = this;
            task.gulp = this._gulp;
            task.init();

            this._tasks.push(task.name);
            this._gulp.task(task.name, task.run.bind(task));
            if (this.isWatch()) {
                task.watch();
            }
        }
    }, {
        key: '_generateName',
        value: function _generateName(group) {
            if (!this._nameIndexes[group]) {
                this._nameIndexes[group] = 0;
            }
            this._nameIndexes[group]++;
            return this._config.name + (this._nameIndexes[group] > 1 ? this._nameIndexes[group] : '');
        }
    }, {
        key: '_parseDest',
        value: function _parseDest(dest, isFile, group) {
            dest = dest || '';

            if (isFile) {
                var matchFile = /\/?([^\/]+)$/.exec(dest);
                var file = matchFile !== null ? matchFile[1] : this._generateName(group);
                var dir = dest.replace(/\/?[^\/]*$/, '');
                if (!dir) {
                    dir = this._config.dest;
                }

                var matchExt = /\.([^\.]+)$/.exec(file);
                var ext = matchExt !== null ? matchExt[1] : '';
                return {
                    dir: dir,
                    file: file,
                    name: ext ? file.substr(0, file.length - ext.length - 1) : file,
                    ext: ext
                };
            } else {
                var matchName = /\/?([^\/]+)$/.exec(dest);
                return {
                    dir: dest.replace('/\/$/', ''),
                    file: '',
                    name: matchName !== null ? matchName[1] : this._generateName(group),
                    ext: ''
                };
            }
        }
    }, {
        key: '_normalizeSrc',
        value: function _normalizeSrc(src) {
            if (!_lodash2['default'].isArray(src)) {
                src = [src];
            }

            var files = [];
            _lodash2['default'].each(src, function (path) {
                files = files.concat(_glob2['default'].sync(path, { cwd: process.cwd(), root: '/' }));
            });

            return files;
        }
    }]);

    return Manager;
})();

exports['default'] = Manager;
module.exports = exports['default'];