import { call, put, fork, cancel } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import moment from 'moment';
import types, {APP_API_SUCCESS, APP_API_FAILURE} from '../actions/app';
import utils from '../utilities';

const defaultDelay = 300;

function* callApi(name, options, func, ...args) {
  try {
      if (!options || options.delay === undefined || options.delay > 0) {
          const delayValue = options && options.delay || defaultDelay;
          yield call(delay, delayValue);
      }

      const { response } = yield call(func, ...args);
      const success = {name, response};
      if (options && options.SUCCESS) {
          yield put(options.SUCCESS(success));
      }
      yield put(APP_API_SUCCESS(success));
  } catch(error) {
      const failure = {name, error: error.error || error};
      if (options && options.FAILURE) {
          yield put(options.FAILURE(failure))
      }
      yield put(APP_API_FAILURE(failure));
  }
}

let calls = {
};

export default function* () {
  yield* takeEvery([types.APP_API_REQUEST, types.APP_API_CANCEL, types.APP_API_SUCCESS, types.APP_API_FAILURE], function* ({type, payload}) {
      const name = payload.name || utils.randomString(32);

      if (type === types.APP_API_REQUEST) {
          if (calls[name]) {
              yield cancel(calls[name].task);
          }

          const options = {
              ...payload.options,
              SUCCESS: payload.SUCCESS,
              FAILURE: payload.FAILURE
          };

          const task = yield fork(callApi, name, options, payload.func, ...payload.args);
          calls[name] = {
              task,
              time: moment()
          }
      } else {
          if (type === types.APP_API_CANCEL && calls[name]) {
              yield cancel(calls[name].task);
          }
          delete calls[name];
      }
  });
}
