import 'babel-polyfill';
import logger from 'koa-logger';
import { run } from 'server/host';
import * as applications from 'server/applications';
import middlewares from 'server/middlewares'

const config = {};

run({
    [3000]: {
    paths: {
      '/api': applications.api,
      '/': applications.client(config)
    },
    middlewares: [logger(), middlewares.agent]
  }
});
