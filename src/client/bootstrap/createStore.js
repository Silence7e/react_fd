import createSagaMiddleware from 'redux-saga';

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { routerReducer, routerMiddleware } from 'react-router-redux';

let store = null;

export function getStore() {
  return store;
}

export default async function (reducers, sagas, history, action) {
  if (store) {
      return store;
  }

  const sagaMiddleware = createSagaMiddleware();

  let middlewares = [
      routerMiddleware(history),
      sagaMiddleware
  ];

  if (process.env.NODE_ENV === 'development') {
      let createLogger = require('redux-logger');
      middlewares.push(createLogger());
  }

  let composedApplyMiddleware = applyMiddleware(...middlewares);

  if (process.env.NODE_ENV === 'development') {
      composedApplyMiddleware = compose(composedApplyMiddleware,
          typeof window === 'object' && window.devToolsExtension ? window.devToolsExtension() : f => f);
  }

  store = createStore(
      combineReducers({
          ...reducers,
          routing: routerReducer
      }),
      composedApplyMiddleware
  );
  sagaMiddleware.run(sagas);
  if (action) {
      store.dispatch(action);
  }

  return store;
}
