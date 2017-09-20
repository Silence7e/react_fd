export default async function () {
  if (global.FormData) {
      return Promise.resolve();
  }

  return new Promise((resolve) => require.ensure(
      ['js-polyfills/xhr'],
      (require) => resolve(require('js-polyfills/xhr')),
      'polyfill-FormData-Storage-setImmediate'));
}
