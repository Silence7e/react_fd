'use strict';

var path = require('path');
var gutil = require('gulp-util');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackDevServer = require('webpack-dev-server');
var HtmlPlugin = require('html-webpack-plugin');
var rootdir = process.cwd();

module.exports = function(gulp, sources, dest, callback, options) {
    process.env.NODE_ENV = 'development';

    var port = options.devServer && options.devServer.port || 8888;
    var host = options.devServer && options.devServer.host || 'localhost';

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

    for (var entry in sources) {
        if (sources.hasOwnProperty(entry)) {
            sources[entry].unshift('webpack/hot/dev-server');
            sources[entry].unshift('webpack-dev-server/client?http://' + host + ':' + port + '/');
        }
    }

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
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    minimize: true,
                    sourceMap: true,
                    localIdentName: '[path][name]---[local]---[hash:base64:5]'
                  }
                }
              ]
            });
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
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    minimize: true,
                    sourceMap: true,
                  }
                }
              ]
            });
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
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            });
        }
    });

    options.entry = sources;
    options.output.path = path.resolve(process.cwd(), dest);
    options.output.publicPath = '/';

    if (options.html) {
        var htmlOption = {
            template: path.resolve(rootdir, 'src', options.html)
        };
        options.plugins.push(new HtmlPlugin(htmlOption));
    }
    delete options.html;
    delete options.offline;
    delete options.uglify;
    options.plugins.push(new webpack.HotModuleReplacementPlugin());
    options.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    }));
    var compiler = webpack(options);
    var server = new WebpackDevServer(compiler, {
        contentBase: './build',
        hot: true,
        historyApiFallback: true,
        staticOptions: {
        },
        quiet: false,
        noInfo: false,
        lazy: false,
        stats: Object.assign({
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
        }, options.stats),
        proxy: Object.assign({
        }, options.devServer && options.devServer.proxy)
    });

    server.listen(port, host, function(err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
        gutil.log('[webpack-dev-server]', 'http://' + host + ':' + port);
        // callback();
    });
};
