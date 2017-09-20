// jscs:disable disallowVar
/* eslint-disable no-var */

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var rootdir = process.cwd();

module.exports = function (config) {
    var client = {
        name: config.env || 'app' + '-client-' + config.locale || 'default',
        target: 'web',
        devtool: 'source-map',
        output: {
            filename: '[name]-[hash].js',
            chunkFilename: '[name]-[chunkhash].js'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: [path.resolve(rootdir, 'src')],
                    use: [{loader:'babel-loader'}]
                },
                {
                    test: /\.css$/,
                    modules: true,
                    include: [path.resolve(rootdir, 'src')],
                    use: [
                        {loader:'style-loader'},
                        {
                            loader: 'css-loader',
                            options:{
                                root:'./client'
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    modules: false,
                    include: [path.resolve(rootdir, 'node_modules')],
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.s(c|a)ss$/,
                    include: [path.resolve(rootdir, 'src')],
                    use: [
                        {loader: 'style-loader'},
                        {loader: 'css-loader'},
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    ctx: {
                                        autoprefixer: { browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8'] }
                                    }
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options:{
                                sourceMap:true
                            }
                        }
                    ]
                },
                {
                    test: function (path) {
                        return !path.match(/content\/(.*)\.png$/) && !path.match(/wx_mp\/img/) && path.match(/\.png$/);
                    },
                    include: [path.resolve(rootdir, 'src')],
                    use: [
                      {
                          loader:'url-loader',
                          options:{
                              limit:10240,
                              name:'assets/[name]-[hash:20].[ext]'
                          }
                      },
                    ]
                },

                {
                    test: /content\/(.*)\.(png|svg|gif|jpe?g)$/,
                    include: [path.resolve(rootdir, 'src')],
                    use: [{
                        loader:'file-loader',
                        options: {
                            name: 'assets/content/[name].[ext]'
                        }
                    }]
                },
                {
                    test: function (path) {
                        return !path.match(/content\/(.*)\.(gif|svg|jpe?g)$/) && path.match(/\.(gif|jpe?g|svg)$/);
                    },
                    include: [path.resolve(rootdir, 'src')],
                    use: [
                        {
                            loader:'file-loader',
                            options:{
                                name:'assets/[name]-[hash:20].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.ico$/,
                    include: [path.resolve(rootdir, 'src')],
                    use: [
                        {
                            loader:'file-loader',
                            options: {
                                name: '[name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.woff|ttf|eot$/,
                    include: [path.resolve(rootdir, 'src')],
                    use: [
                        {
                            loader:'url-loader',
                            options: {
                                limit:1024,
                                name: 'assets/fonts/[name].[ext]'
                            }
                        }
                    ]
                }
            ],
            noParse: /node_modules\/quill\/dist/
        },
        resolve: {
            extensions: ['.web.js', '.js', '.json'],
            modules: [  path.resolve(rootdir, 'src/client'), path.resolve(rootdir, 'src'), path.resolve(rootdir, 'node_modules')]
        },
        resolveLoader: {
            modules: [
                path.resolve(rootdir, 'webpack/loaders'),
                path.resolve(rootdir, 'node_modules')
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                minChunks: Infinity
            }),
            new webpack.LoaderOptionsPlugin({
                options: {
                    context: '/',
                    postcss:{
                        includePaths: [
                            path.resolve(rootdir, 'src/client'),
                            path.resolve(rootdir, 'src'),
                            path.resolve(rootdir, 'node_modules')
                        ]
                    },
                    sassLoader: {
                        includePaths: [
                            path.resolve(rootdir, 'src/client'),
                            path.resolve(rootdir, 'src'),
                            path.resolve(rootdir, 'node_modules')
                        ]
                    }
                }
            }),
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.BannerPlugin(config.copyright),
            new ExtractTextPlugin({
                filename:'[contenthash:20].[name].css',
                allChunks: true})
        ],
        devServer: {
            host: '0.0.0.0',
            proxy: {
                '/api/*': {
                    target: 'http://localhost:8090/',
                    secure: false,
                    changeOrigin: true
                }
            }
        },
        uglify: true,
        offline: false,
        html: ''
    };

    var server = {
        name: config.env || 'app' + '-server-' + config.locale || 'default',
        target: 'node',
        devtool: 'source-map',
        output: {
            filename: '[name].js',
            chunkFilename: '[name].[chunkhash].js'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: [path.resolve(rootdir, 'src')],
                    use: ['babel-loader']
                }
            ]
        },
        resolve: {
            alias: {
                'any-promise': path.resolve(rootdir, 'src/server/shim/any-promise'),
                'busboy': path.resolve(rootdir, 'src/server/shim/busboy')
            },
            modules: [path.resolve(rootdir, 'src'), path.resolve(rootdir, 'src/server'), path.resolve(rootdir, 'node_modules')]
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.BannerPlugin(config.copyright),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_PG_FORCE_NATIVE': 'undefined'
                }
            })
        ],
        node: {
            __filename: true,
            __dirname: true
        }
    };

    return [client, server];
};
