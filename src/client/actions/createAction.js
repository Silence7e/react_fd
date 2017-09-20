import { createAction } from 'redux-actions';

export default (type) => {
  return createAction(type, (payload) => payload, (payload, meta) => meta);
}
