import createAction from './createAction';

const types = {
  'APP_INIT' : 'APP_INIT',
  'APP_EXIT' : 'APP_EXIT',
  'APP_API_REQUEST' : 'APP_API_REQUEST',
  'APP_API_SUCCESS' : 'APP_API_SUCCESS',
  'APP_API_FAILURE' : 'APP_API_FAILURE',
  'APP_API_CANCEL' : 'APP_API_CANCEL',
  'APP_SERVICE_START' : 'APP_SERVICE_START',
  'APP_SERVICE_DONE' : 'APP_SERVICE_DONE',
  'APP_SERVICE_ERROR' : 'APP_SERVICE_ERROR',
  'APP_SERVICE_CANCEL' : 'APP_SERVICE_CANCEL',
  'CLEAN_ERROR_MESSAGE': 'CLEAN_ERROR_MESSAGE',
  'CLEAN_SUCCESS_MESSAGE': 'CLEAN_SUCCESS_MESSAGE',
  'SET_ERROR_MESSAGE': 'SET_ERROR_MESSAGE',
  'APP_LOAD_DATA': 'APP_LOAD_DATA',
  'FETCH_BASE_DATA': 'FETCH_BASE_DATA',
  'FETCH_BASE_DATA_ERROR': 'FETCH_BASE_DATA_ERROR',
  'CLEAR_DATA': 'CLEAR_DATA',
  'APP_ROUTE_CHANGE': 'APP_ROUTE_CHANGE',
  'APP_AUTH_USER': 'APP_AUTH_USER',
  'APP_INIT_DATA': 'APP_INIT_DATA',
  'CLEAN_INIT_DATA': 'CLEAN_INIT_DATA',
  'PREPARE_LOADING': 'PREPARE_LOADING',
  'START_LOADING': 'START_LOADING'
};

export const APP_INIT = createAction(types.APP_INIT);
export const APP_EXIT = createAction(types.APP_EXIT);
export const APP_API_REQUEST = createAction(types.APP_API_REQUEST);
export const APP_API_SUCCESS = createAction(types.APP_API_SUCCESS);
export const APP_API_FAILURE = createAction(types.APP_API_FAILURE);
export const APP_API_CANCEL = createAction(types.APP_API_CANCEL);
export const APP_SERVICE_START = createAction(types.APP_SERVICE_START);
export const APP_SERVICE_DONE = createAction(types.APP_SERVICE_DONE);
export const APP_SERVICE_CANCEL = createAction(types.APP_SERVICE_CANCEL);
export const APP_SERVICE_ERROR = createAction(types.APP_SERVICE_ERROR);
export const CLEAN_ERROR_MESSAGE = createAction(types.CLEAN_ERROR_MESSAGE);
export const CLEAN_SUCCESS_MESSAGE = createAction(types.CLEAN_SUCCESS_MESSAGE);
export const APP_LOAD_DATA = createAction(types.APP_LOAD_DATA);
export const FETCH_BASE_DATA = createAction(types.FETCH_BASE_DATA);
export const FETCH_BASE_DATA_ERROR = createAction(types.FETCH_BASE_DATA_ERROR);
export const CLEAR_DATA = createAction(types.CLEAR_DATA);
export const APP_AUTH_USER = createAction(types.APP_AUTH_USER);
export const APP_INIT_DATA = createAction(types.APP_INIT_DATA);
export const APP_ROUTE_CHANGE = createAction(types.APP_ROUTE_CHANGE);
export const CLEAN_INIT_DATA = createAction(types.CLEAN_INIT_DATA);
export const PREPARE_LOADING = createAction(types.PREPARE_LOADING);
export const START_LOADING = createAction(types.START_LOADING);
export const SET_ERROR_MESSAGE = createAction(types.SET_ERROR_MESSAGE);

export default types;
