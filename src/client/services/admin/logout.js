import { call, select} from 'redux-saga/effects';
import API from '../../api';
import storage from '../../storage';
import selectors from '../../selectors/user';

export default function* () {
    const hash = yield select(selectors.getAdminToken);
    const { response: data } = yield call(API.content.logout, {hash});
    yield call(storage.remove, 'global', 'admin');
    return {};
}
