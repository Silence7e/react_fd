import { call, put } from 'redux-saga/effects';
import storage from 'client/storage';
import { APP_LOAD_DATA } from 'client/actions/app';
import common  from 'client/services/common';

export default function*() {
/*    const user = yield call(storage.get, 'global', 'user');
    if (user) {
        yield put(APP_LOAD_DATA(user));
    }
    const admin = yield call(storage.get, 'global', 'admin');
    if (admin) {
        yield put(APP_LOAD_DATA(admin));
    }*/
    const clientId = yield call(common.clientId);
    if(clientId){
        yield put(APP_LOAD_DATA({clientId}));
    }
}
