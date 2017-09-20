// jscs:disable disallowVar
/* eslint-disable no-var */

var path = require('path');
var mime = require('mime');
var loaderUtils = require('loader-utils');

module.exports = function (content) {
    this.cacheable && this.cacheable();
    if(!this.emitFile) throw new Error('emitFile is required from module system');

    var query = loaderUtils.getOptions(this.query);

    var id = path.basename(this.resourcePath);
    if (query.id) {
        id = query.id.replace('[filename]', id).replace('\\[', '[').replace('\\]', ']').replace('\\\\', '\\');
    }

    var url = loaderUtils.interpolateName(this, query.name || '[hash:20].[name].[ext]', {
        context: query.context || this.options.context,
        content: content,
        regExp: query.regExp
    });

    var limit = (this.options && this.options.contentLoader && this.options.contentLoader.dataUrlLimit) || 0;
    if(query.limit) {
        limit = query.limit === true ? limit : parseInt(query.limit, 10);
    }

    var output;
    if (limit > 0 && content.length < limit) {
        var mimetype = query.mimetype || mime.lookup(this.resourcePath);
        output = JSON.stringify('data:' + (mimetype ? mimetype + ';' : '') + 'base64,' + content.toString('base64'));
    } else {
        this.emitFile(url, content);
        output = '__webpack_public_path__ + ' + JSON.stringify(url);
    }

    return [
        'var content = {id: ' + JSON.stringify(id) + ' , type: "asset", name: ' + JSON.stringify(path.basename(url)) + ', value: ' + output + '};',
        'module.exports = content;'
    ].join('\n');
};

module.exports.raw = true;
