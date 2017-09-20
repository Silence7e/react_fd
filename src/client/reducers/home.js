import { handleActions } from 'redux-actions';
import appTypes from '../actions/app';

export default handleActions({
    [appTypes.FETCH_BASE_DATA]: (state, action) => {
        if (action.payload.name === '/') {
            return {
                ...state,
                text: action.payload.text
            }
        }
        else {
            return state;
        }
    },
    [appTypes.APP_API_SUCCESS]: (state, action) => {
        if (action.payload.name === 'getText'){
            return {
                ...state,
                text: action.payload.response
            }
        }
        else {
            return state;
        }
    }
}, {});
