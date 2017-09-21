'use strict';

var gulp = require('gulp');
var minimist = require('minimist');
var path = require('path');

var config = path.resolve('./src', 'webpack.config.js');
var clientEntry ={
  main: [path.resolve('./src', 'client/bootstrap/main.js')],
  vendor:['react','react-dom','react-css-modules','react-redux', 'react-router', 'react-router-redux']

};
var serverEntry = path.resolve('./src', 'server/main.js');

require('./gulp')(gulp, [
    {
        name: 'clean',
        dest: 'build',
        options: {
            cwd: process.cwd()
        }
    },
    {
        name: 'csslint',
        sources: 'src/**/*.css'
    },
    {
        name: 'eslint',
        sources: 'src/**/*.{js,jsx}',
        depends: ['clean']
    },
    {
        name: 'sasslint',
        sources: 'src/**/*.{scss, sass}',
        depends: ['clean']
    },
    {
        name: 'build:client',
        task: 'webpack',
        sources: clientEntry,
        dest: 'build/public',
        options: require(config)[0],
        depends: ['clean', 'lint']
    },
    {
        name: 'build:server',
        task: 'webpack',
        sources: serverEntry,
        dest: 'build',
        options: require(config)[1],
        depends: ['clean']
    },
    {
        name: 'dev',
        task: 'webpack-dev-server',
        sources: clientEntry,
        dest: 'build/public/',
        options: require(config)[0],
        depends: []
    },
    {
        name: 'static-resource',
        task: 'copy-static-resource',
        sources: path.resolve('./src/client/static/**/*'),
        dest: 'build/static',
        depends: ['clean']
    },
    {
        name: 'wx-resource',
        task: 'copy-static-resource',
        sources: path.resolve('./src/client/assets/wx_mp/**/*'),
        dest: 'build/wx_mp',
        depends: ['clean']
    },
    ['lint', 'eslint', 'csslint', 'sasslint'],
    ['build', 'static-resource', 'wx-resource', 'build:client',  'build:server'],
    ['default', 'build']
]);
