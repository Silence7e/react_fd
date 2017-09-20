'use strict';

var gutil = require('gulp-util');
var tasks = require('./tasks');

function loadAction(def, gulp) {
    var task = tasks[def.task];

    if (def.action && def.action instanceof Function) {
        return function(callback) {
            return def.action(callback, task);
        }
    } else if (task !== undefined) {
        return function(callback) {
            if (typeof def.options === 'function') {
                def.options = def.options.call();
            }
            return task(gulp, def.sources, def.dest, callback, def.options);
        };
    } else {
        return task;
    }
}

function convert(target, gulp) {
    var def = {};

    if (typeof target === 'string') {
        def.name = def.task = target;
    } else if (typeof target === 'object') {
        if (target instanceof Array) {
            if (target.length) {
                if (typeof target[0] === 'object') {
                    def = Object.assign(def, target[0]);
                } else if (typeof target[0] === 'string') {
                    def.name = def.task = target[0];
                }

                var depends = [];
                if (def.depends && def.depends.length) {
                    depends = depends.concat(def.depends);
                }
                var sliced = target.slice(1);
                if (sliced && sliced.length) {
                    depends = depends.concat(sliced);
                }

                def.depends = depends;
            } else {
                throw new gutil.PluginError('gulp', 'Invalid target: ' + JSON.stringify(target));
            }
        } else {
            def = Object.assign(def, target);
            if (def.task === undefined) {
                def.task = def.name;
            }
        }
    }

    if (def.env) {
        process.env.NODE_ENV = def.env;
    }

    def.action = loadAction(def, gulp);

    process.env.NODE_ENV = undefined;

    return def;
}

module.exports = function(gulp, targets) {
    targets.forEach(function(target) {
        var def = convert(target, gulp);

        if (def.depends && def.depends.length) {
            gulp.task(def.name, def.depends, def.action);
        } else {
            gulp.task(def.name, def.action);
        }
    });
};
