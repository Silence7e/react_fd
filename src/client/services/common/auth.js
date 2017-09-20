import {call, put} from 'redux-saga/effects';
import Utility from '../../utilities';
import API from '../../api';
import config from 'config';
import {USER_LOGOUT_FINISH} from '../../actions/user';
import storage from '../../storage';

export default function*(location) {
    let valid = true;

    let pathname = location.pathname;
    if (pathname !== '/' && pathname.endsWith('/')) {
        pathname = pathname.substring(0, pathname.length - 1);
    }
    if (location.pathname && config.authRoutes.indexOf(pathname) >= 0) {
        const user = yield call(storage.get, 'global', 'user');
        if (user && user.token && user.identity) {
            const token = user.token;
            const identity = user.identity;
            const cid = config.clientId,
                sts = yield call(storage.get, 'global', 'sts'),
                cts = yield call(storage.get, 'global', 'cts'),
                ts = Utility.generateTimestamp(sts, cts),
                nonce = Utility.randomString(16);
            const {response: result} = yield call(API.token.isExpired, {
                cid, tid: token.id, uid: identity.id, nonce, ts,
                hash: Utility.generateTokenSignature(nonce, ts, cid, identity.id, token.id, token.hash)
            });
            if (result) {
                yield call(storage.remove, 'global', 'user');
                yield put(USER_LOGOUT_FINISH());
                valid = false;
            }
        }
        else {
            yield call(storage.remove, 'global', 'user');
            valid = false;
        }
    }
    return valid;
}
