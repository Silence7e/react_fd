export default async function () {
  if (global.setImmediate) {
      return Promise.resolve();
  }

  return new Promise((resolve) => require.ensure(
      ['js-polyfills/timing'],
      (require) => resolve(require('js-polyfills/timing')),
      'polyfill-FormData-Storage-setImmediate'));
}
