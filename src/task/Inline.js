var _ = require('lodash');
var Base = require('./Base');

class Inline extends Base {

    constructor(manager, name) {
        super(manager, name);

        this.taskHandler = null;
        this.watchHandler = null;
    }

    run() {
        if (_.isFunction(this.taskHandler)) {
            this.taskHandler.call(null, this.gulp, this.name, this.isCompress(), this.isWatch());
        }
    }

    watch() {
        if (_.isFunction(this.watchHandler)) {
            this.watchHandler.call(null, this.gulp, this.name, this.isCompress(), this.isWatch());
        }
    }
    
}

module.exports = Inline;