import { call, put, fork, cancel } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import moment from 'moment';
import types, {APP_SERVICE_DONE, APP_SERVICE_ERROR} from '../actions/app';
import { randomString } from '../utilities';

const defaultDelay = 300;

function* runService(name, options, func, ...args) {
  try {
      if (!options || options.delay === undefined || options.delay > 0) {
          const delayValue = options && options.delay || defaultDelay;
          yield call(delay, delayValue);
      }

      const result = yield call(func, ...args);

      const success = {name, result};
      if (options && options.SUCCESS) {
          yield put(options.SUCCESS(success));
      }
      yield put(APP_SERVICE_DONE(success));
  } catch(error) {
      const failure = {
          name,
          error: error.error || error
      };
      if (options && options.FAILURE) {
          yield put(options.FAILURE(failure));
      }
      yield put(APP_SERVICE_ERROR(failure));
  }
}

let services = {
};

export default function* () {
  yield* takeEvery([types.APP_SERVICE_START, types.APP_SERVICE_CANCEL, types.APP_SERVICE_DONE, types.APP_SERVICE_ERROR], function* ({type, payload}) {
      const name = payload.name || randomString(32);

      if (type === types.APP_SERVICE_START) {
          if (services[name]) {
              yield put(APP_SERVICE_ERROR({name, error: new Error('error.service.running')}));
              return;
          }

          const options = {
              ...payload.options,
              SUCCESS: payload.SUCCESS,
              FAILURE: payload.FAILURE
          };

          const task = yield fork(runService, name, options, payload.func, ...payload.args);
          services[name] = {
              task,
              time: moment()
          };
      } else {
          if (type === types.APP_SERVICE_CANCEL && services[name]) {
              yield cancel(services[name].task);
          }
          delete services[name];
      }
  });
}
