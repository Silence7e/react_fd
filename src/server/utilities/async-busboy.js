import Busboy from 'busboy';
import fs from 'fs';
import path from 'path';
import urlencode from 'urlencode';
import { randomString } from './index';

const EMPTY_ARRAY = 'EMPTY_ARRAY';
const getDescriptor = Object.getOwnPropertyDescriptor;
const dirname = path.dirname(process.argv.find(arg => arg.endsWith('.js') && !arg.startsWith('-')));

module.exports = function (request, options) {
  options = options || {};
  options.headers = request.headers;
  const busboy = new Busboy(options);

  return new Promise((resolve, reject) => {
      const fields = {};
      const files = [];

      request.on('close', cleanup);

      busboy
          .on('field', onField.bind(null, fields))
          .on('file', onFile.bind(null, files, options))
          .on('close', cleanup)
          .on('error', onEnd)
          .on('end', onEnd)
          .on('finish', onEnd);

      busboy.on('partsLimit', function(){
          const err = new Error('Reach parts limit');
          err.code = 'Request_parts_limit';
          err.status = 413;
          onError(err)
      });

      busboy.on('filesLimit', function(){
          const err = new Error('Reach files limit');
          err.code = 'Request_files_limit';
          err.status = 413;
          onError(err)
      });

      busboy.on('fieldsLimit', function(){
          const err = new Error('Reach fields limit');
          err.code = 'Request_fields_limit';
          err.status = 413;
          onError(err)
      });

      request.pipe(busboy);

      function onError(err) {
          cleanup();
          return reject(err);
      }

      function onEnd(err) {
          cleanup();
          return resolve({fields, files})
      }

      function cleanup() {
          busboy.removeListener('field', onField);
          busboy.removeListener('file', onFile);
          busboy.removeListener('close', cleanup);
          busboy.removeListener('end', cleanup);
          busboy.removeListener('error', onEnd);
          busboy.removeListener('partsLimit', onEnd);
          busboy.removeListener('filesLimit', onEnd);
          busboy.removeListener('fieldsLimit', onEnd);
          busboy.removeListener('finish', onEnd);
      }
  })
};

function onField(fields, name, val, fieldnameTruncated, valTruncated) {
  // don't overwrite prototypes
  if (getDescriptor(Object.prototype, name)) return;

  // This looks like a stringified array, let's parse it
  if (name.indexOf('[') > -1) {
      const obj = objectFromHierarchyArray(extractFormDataInputHierachy(name), val);
      console.log(obj);
      reconcile(obj, fields);
      console.log(obj);

  } else {
      fields[name] = val;
  }
}

function onFile(files, options, fieldname, file, filename, encoding, mimetype) {
  const tmpName = file.tmpName = randomString(30) + urlencode(filename);
  const saveTo = path.resolve(options.tempDir, path.basename(tmpName));
  file.on('end', function() {
      const readStream = fs.createReadStream(saveTo);
      readStream.fieldname = urlencode(filename);
      readStream.filename = urlencode(filename);
      readStream.transferEncoding = readStream.encoding = encoding;
      readStream.mimeType = readStream.mime = mimetype;
      files.push({...readStream, fileName: path.basename(tmpName)});
  });
  file.pipe(fs.createWriteStream(saveTo));
}

/**
 *
 * Extract a hierarchy array from a stringified formData single input.
 *
 *
 * i.e. topLevel[sub1][sub2] => [topLevel, sub1, sub2]
 *
 * @param  {String} string: Stringify representation of a formData Object
 * @return {Array} [description]
 *
 */
const extractFormDataInputHierachy = (string) => {
  let arr = string.split('[');
  let first = arr.shift();
  let res = arr.map( v => v.split(']')[0] );
  res.unshift(first);
  return res
};

/**
 *
 * Generate an object given an hiearchy bluepint and the value
 *
 * i.e. [key1][key2][key3] => { key1: {key2: { key3: value }}};
 *
 * @param  {Array} arr:   from extractFormDataInputHierachy
 * @param  {[type]} value: The actual value for this key
 * @return {[type]}     [description]
 *
 */
const objectFromHierarchyArray = (arr, value) => {
  value = value === EMPTY_ARRAY ? [] : value;
  return arr
      .reverse()
      .reduce((acc, next) => {
          return {[next]: acc}
      }, value)
};

const reconcile = (obj, target) => {
  let key = Object.keys(obj)[0];
  if ( target.hasOwnProperty(key)) {
      return reconcile(obj[key], target[key])
  } else {
      return target[key] = obj[key];
  }
};
