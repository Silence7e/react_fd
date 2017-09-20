import {call} from 'redux-saga/effects';
import { copy } from 'client/effects';

export default function* (content) {
    return yield call(copy, content);
}
