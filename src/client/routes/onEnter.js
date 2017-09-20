import { getStore } from '../bootstrap/createStore';
import { APP_ROUTE_CHANGE } from '../actions/app';

function makeDone(replace, callback) {
  return async function(path, err) {
      return new Promise((resolve, reject) => {
          path && replace(path);
          callback(err);
          err ? reject(err) : resolve();
      });
  };
}

export default function (nextState, replace, callback) {
  getStore().dispatch(APP_ROUTE_CHANGE({nextState, done: makeDone(replace, callback)}));
}
