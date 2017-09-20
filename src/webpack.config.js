// jscs:disable disallowVar
/* eslint-disable no-var */
var _ = require('lodash');
var config = require('./config');
var webpack = require('../webpack/config')(config);
var path = require('path');

var page = _.merge({}, webpack[0]);
var server = webpack[1];


page.output.publicPath = '/public/';
page.html = 'client/bootstrap/page.ejs';
page.devServer.port = 8888;

module.exports = [page, server];
