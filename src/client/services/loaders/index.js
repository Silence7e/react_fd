import { call } from 'redux-saga/effects';
import API from '../../api';

const url = '/';

function* load() {
    let {response:text} = yield call(API.home.getInitText,{id:1});
    console.log(text);
   return {text};
}

export default {
    [url]: load,
};

