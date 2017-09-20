export default async function () {
  if (global.fetch) {
      return Promise.resolve();
  }

  return new Promise((resolve) => require.ensure(
      ['isomorphic-fetch'],
      (require) => resolve(require('isomorphic-fetch')),
      'polyfill-fetch'));
}
