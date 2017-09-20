export default async function () {
  if (global.Promise) {
    return Promise.resolve();
  }
  return new Promise((resolve) => require.ensure(
    ['es6-promise/auto'],
    (require) => resolve(require('es6-promise/auto')),
    'polyfill-es6-promise'));
}