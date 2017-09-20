import { call, put } from 'redux-saga/effects';
import API from '../../api';
import storage from '../../storage';
import {push} from 'react-router-redux';
import urls from 'common/client/routes/desktop/urls';

export default function*(username, password) {

    const { response: data } = yield call(API.content.login, {username, password});

    const res = data;

    yield call(storage.save, 'global', 'admin', res);

    yield put(push(urls.root));

    return res;
}
