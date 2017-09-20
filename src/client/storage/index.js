import store from 'store2';

export async function save(namespace, key, value) {
  return new Promise(function(resolve, reject) {
      try {
          const storage = namespace ? store.namespace(namespace) : store;
          try {
              storage.set(key, value);
          } catch (err) {
              // Do nothing on save local failure
          }

          storage.session.set(key, value);
          resolve();
      }catch(err) {
          reject(err);
      }
  });
}

export async function get(namespace, key, alt) {
  return new Promise(function(resolve, reject) {
      try {
          const storage = namespace ? store.namespace(namespace) : store;

          resolve(storage.session.get(key) || storage.get(key) || alt);
      } catch(err) {
          reject(err);
      }
  });
}

export async function remove(namespace, key) {
  return new Promise(function(resolve, reject) {
      try {
          const storage = namespace ? store.namespace(namespace) : store;

          storage.session.remove(key);
          storage.remove(key);
          resolve();
      } catch (err) {
          reject(err);
      }
  });
}

export async function clear(namespace) {
  return new Promise(function(resolve, reject) {
      try {
          const storage = namespace ? store.namespace(namespace) : store;

          storage.session.clear();
          storage.clear();
          resolve();
      } catch (err) {
          reject(err);
      }
  });
}

export default {
  save,
  get,
  remove,
  clear
}
