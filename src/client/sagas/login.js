import { take, put, fork, cancel } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import types, { USER_LOGOUT_FINISH } from '../actions/user';
import services from '../services/user';

export default function* () {
  yield* takeEvery(types.USER_LOGIN_REQUEST, function* ({payload}) {
      const task = yield fork(services.authorize, payload.username, payload.password, payload.redirect);
      const action = yield take([types.USER_LOGOUT_REQUEST, types.USER_LOGIN_FAILURE]);

      if (action.type === types.USER_LOGOUT_REQUEST) {
          if (task.isRunning()) {
              yield cancel(task);
          } else {
              yield fork(services.logout, task.result());
          }
          yield put(USER_LOGOUT_FINISH());
      }
  });
}
