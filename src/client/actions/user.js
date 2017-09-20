import createAction from './createAction';

const types = {
  'USER_LOGIN_REQUEST': 'USER_LOGIN_REQUEST',
  'USER_LOGIN_SUCCESS': 'USER_LOGIN_SUCCESS',
  'USER_LOGIN_FAILURE': 'USER_LOGIN_FAILURE',
  'USER_LOGOUT_REQUEST': 'USER_LOGOUT_REQUEST',
  'USER_LOGOUT_FINISH': 'USER_LOGOUT_FINISH'
};

export const USER_LOGIN_REQUEST = createAction(types.USER_LOGIN_REQUEST);
export const USER_LOGIN_SUCCESS = createAction(types.USER_LOGIN_SUCCESS);
export const USER_LOGIN_FAILURE = createAction(types.USER_LOGIN_FAILURE);
export const USER_LOGOUT_REQUEST = createAction(types.USER_LOGOUT_REQUEST);
export const USER_LOGOUT_FINISH = createAction(types.USER_LOGOUT_FINISH);

export default types;
