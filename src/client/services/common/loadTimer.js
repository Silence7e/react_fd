import {put, call} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {PREPARE_LOADING, START_LOADING} from '../../actions/app';

export default function*(ms) {
    yield put(PREPARE_LOADING());
    yield call(delay, ms);
    yield put(START_LOADING());
}
