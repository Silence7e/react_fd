import polyfillStorage from './Storage';
import polyfillFormData from './FormData';
import polyfillURL from './URL';
import polyfillSetImmediate from './setImmediate';
import polyfillFetch from './fetch';
import polyfillPromise from './promise';

export default async function() {
  await Promise.all([
      polyfillStorage(),
      polyfillFormData(),
      polyfillURL(),
      polyfillSetImmediate(),
      polyfillFetch(),
      polyfillPromise(),
  ]);
}
