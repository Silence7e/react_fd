import { take, fork, cancel, call } from 'redux-saga/effects';
import types from '../actions/app';

export callApi from './callApi';
export runService from './runService';
export login from './login';
export routeChange from './routeChange';
export init from './init';

export default function(sagas, initializer, ...args) {
  return function*() {
      yield take(types.APP_INIT);

      const task = yield fork(function*() {
          yield sagas.map(s => fork(s));
      });

       if (initializer) {

          if (args && args.length) {
              yield call(initializer, ...args);
          } else {
              yield call(initializer);
          }
      }
      yield take(types.APP_EXIT);
      cancel(task);
  };
}
