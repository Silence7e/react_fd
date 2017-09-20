import {call} from 'redux-saga/effects';
import { rewrite } from 'client/effects';

export default function* ({content}) {
    yield call(rewrite, content);
}
