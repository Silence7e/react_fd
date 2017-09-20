import 'babel-polyfill';

import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory, hashHistory } from 'react-router';
import desktopStyle from './desktop.scss';
import { onerror, onunhandledrejection } from './errorHandler';
import createStore from './createStore';
import polyfill from '../polyfill';
import reducers from '../reducers';
import sagas from '../sagas/desktop';
import routes from '../routes';
import 'assets/favicon.ico';
import config from 'config';
import { APP_INIT } from '../actions/app';

async function startup(history, store, routes, config, id) {
  let root = document.getElementById(id || config.rootId);
  if (!root) {
      root = document.createElement('div');
      root.id = config.rootId || 'root';
      document.body.appendChild(root);
  }

  global.onerror = onerror;
  global.onunhandledrejection = onunhandledrejection;

  if (process.env.NODE_ENV !== 'development') {
      if (!window.console) {
          window.console = {};
      }
      window.console.log = function () {
          return;
      };
  }

  // https://github.com/ReactTraining/react-router/issues/2019
  ReactDOM.render(
      <Provider store={store}>
          <Router onUpdate={() => window.scrollTo(0, 0)} history={syncHistoryWithStore(history, store)} routes={routes}/>
      </Provider>,
      root);
}

(async function() {
  await polyfill();
  const history = location && location.protocol === 'file:' ? hashHistory : browserHistory;

  const store = await createStore(reducers, sagas, history, APP_INIT());
  startup(history, store, routes, config);
})();
