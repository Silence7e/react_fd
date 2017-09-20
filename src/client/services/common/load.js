import {call, put, select, fork} from 'redux-saga/effects';
import Utility from '../../utilities';
import config from 'config';
import selectors from '../../selectors/user';
import storage from '../../storage';
import {FETCH_BASE_DATA, FETCH_BASE_DATA_ERROR} from '../../actions/app';

export default function* (location, loaders) {
    try {
        if (!location.pathname) {
            return;
        }

        const sts = yield call(storage.get, 'global', 'sts');
        const cts = yield call(storage.get, 'global', 'cts');
        let ts = Utility.generateTimestamp(sts, cts);

        const token = yield select(selectors.getToken);

        const context = {
            cid: config.clientId,
            location,
            ts,
            token
        };
        if (token) {
            context.tid = token.id;
            context.ts = token.ts ? token.ts : context.ts;
        }

        const identity = yield select(selectors.getIdentity);
        if (identity) {
            context.uid = identity.id;
        }

        let results = {};
        let pathname = location.pathname;
        if (pathname !== '/' && pathname.endsWith('/')) {
            pathname = pathname.substring(0, pathname.length - 1);
        }
        const loader = loaders[pathname];

        if (loader) {
            results = yield call(loader, context);
        }
        if (Object.keys(results).length > 0) {
            results.name = pathname;
            yield put(FETCH_BASE_DATA(results));
        }
    }
    catch(error) {
        const failure = {
            name: location.pathname,
            error: error.error || error
        };
        yield put(FETCH_BASE_DATA_ERROR(failure));
    }
}
