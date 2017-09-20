'use strict';

var os = require('os');
var gutil = require('gulp-util');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = require('webpack-uglify-parallel');
var OfflinePlugin = require('offline-plugin');
var HtmlPlugin = require('html-webpack-plugin');
var fs = require('fs');
var path = require('path');
var rootdir = process.cwd();

module.exports = function(gulp, sources, dest, callback, options) {
    process.env.NODE_ENV = 'production';

    // normalize sources
    if (typeof sources === 'string') {
        sources = {
            main: [sources]
        };
    } else if (typeof sources === 'object') {
        if (sources instanceof Array) {
            sources = {
                main: sources
            }
        } else {
            for (var key in sources) {
                if (!sources.hasOwnProperty(key)) {
                    continue;
                }
                if (typeof sources[key] === 'string') {
                    sources[key] = [sources[key]];
                }
            }
        }
    }

    options.entry = sources;
    options.output.path = path.resolve(rootdir, dest);

    options.module.rules.forEach(function(loader) {
        var func = loader.test;
        if ( loader.test instanceof RegExp) {
            func = loader.test.test.bind(loader.test);
        }

        if (func('test.css')) {
            if(loader.modules){
              loader.use = ExtractTextPlugin.extract({
                fallback: [
                  {
                    loader: 'style-loader',
                    options: {
                      sourceMap: true
                    }
                  }
                ],
                use:[
                  {
                    loader: 'css-loader',
                    options: {
                      modules: true,
                      minimize: true,
                      sourceMap: true
                    }
                  },

                ]});
            }else{
              loader.use = ExtractTextPlugin.extract({
                fallback: [
                  {
                    loader: 'style-loader',
                    options: {
                      sourceMap: true
                    }
                  }
                ],
                use:[
                  {
                    loader: 'css-loader',
                    options: {
                      minimize: true,
                      sourceMap: true
                    }
                  },
                ]});
            }
            delete loader.modules;
        } else if (func('test.scss') || func('test.sass')) {
            loader.use = ExtractTextPlugin.extract({
                fallback: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            minimize: true,
                            sourceMap: true,
                            localIdentName: '[path][name]---[local]---[hash:base64:5]'
                        }
                    },
                    {loader: 'postcss-loader'},
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            });
        }
    });

    if (options.html) {
        var htmlOption = {
            template: path.resolve(rootdir, 'src', options.html)
        };
        options.plugins.push(new HtmlPlugin(htmlOption));
    }
    delete options.html;
    options.plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));
    options.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    }));

    if (options.uglify) {
        options.plugins.push(new UglifyJsPlugin(Object.assign({
            workers: os.cpus().length,
            compress: {
                dead_code: true,
                warnings: false,
                drop_debugger: true,
                conditionals: true,
                booleans: true,
                unused: true
            }
        }, typeof options.uglify === 'object' ? options.uglify : {})));
    }
    delete options.uglify;
    // note: needs to keep offline plugin be the last one
    if (options.offline) {
        options.plugins.push(new OfflinePlugin());
    }
    delete options.offline;
    webpack(options, function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString(Object.assign({
            colors: true,
            reasons: true,
            chunkModules: false,
            chunkOrigins: true,
            modules: false,
            cached: true,
            cachedAssets: true,
            source: true,
            errorDetails: true,
            publicPath: true
        }, options.stats)));
        if (callback) {
            callback();
        }
    });
};
