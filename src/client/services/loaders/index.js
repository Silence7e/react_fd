import { call } from 'redux-saga/effects';
import API from '../../api';

const url = '/';

function* load({location}) {
    let id = Number(location.query.id) || 1
    let {response:text} = yield call(API.home.getInitText,{id});
   return {text};
}

export default {
    [url]: load,
};

