var through = require('through2');

class Base {

    static _noop () {
        return through.obj(function(file, enc, cb) {
            this.push(file);
            cb();
        });
    }

    constructor(gulp, manager, name) {
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


    init() {

    }

    run() {
    }

    watch() {

    }

    isWatch() {
        return this.manager.isWatch();
    }

    isCompress() {
        return this.manager.isCompress();
    }
}

module.exports = Base;