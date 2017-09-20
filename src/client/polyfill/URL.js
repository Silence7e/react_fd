export default async function () {
  if (global.URL && global.URLSearchParams) {
      return Promise.resolve();
  }

  return new Promise((resolve) => require.ensure(
      ['js-polyfills/url'],
      (require) => resolve(require('js-polyfills/url')),
      'polyfill-URL'));
}
