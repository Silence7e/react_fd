import { call, fork, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import types from 'client/actions/app';
import common from '../services/common';

import storage from 'client/storage';
import { APP_LOAD_DATA } from 'client/actions/app';

export default function (loaders, urls) {
  return function*() {
      yield* takeEvery(types.APP_ROUTE_CHANGE, function*({payload: {nextState, done}}) {

          const {location} = nextState;
          const valid = yield call(common.auth, location);

          if (valid){
              const user = yield call(storage.get, 'global', 'user');
              if (user) {
                  yield put(APP_LOAD_DATA(user));
              }
          }
          const admin = yield call(storage.get, 'global', 'admin');
          if (admin) {
              yield put(APP_LOAD_DATA(admin));
          }

          let path = null;
          if (valid || location.pathname === urls.root) {
              yield fork(common.load, location, loaders);
          }
          else {
              path = urls.accountLogin;
          }

          yield call(done, path);
      });
  }
}
