export default async function() {
  let shouldPolyfill = false;
  try {
      // Test webstorage existence.
      if (!window.localStorage || !window.sessionStorage) throw "exception";
      // Test webstorage accessibility - Needed for Safari private browsing.
      const key = '__storage_test__';
      localStorage.setItem(key, 1);
      localStorage.removeItem(key);
  } catch (e) {
      shouldPolyfill = true;
  }

  if (!shouldPolyfill) {
      return Promise.resolve();
  }

  return new Promise((resolve) => require.ensure(
      ['./Storage.js'],
      (require) => resolve(require('./Storage.js')),
      'polyfill-FormData-Storage-setImmediate'));
}
