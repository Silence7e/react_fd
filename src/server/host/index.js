import 'babel-polyfill';

import http from 'http';
import Koa from 'koa';
import mount from 'koa-mount';

export function run (applications, middlewares) {
  for (const port in applications) {
      if (!applications.hasOwnProperty(port)) {
          continue;
      }

      const server = new Koa();
      for (let i = 0; i < applications[port].middlewares.length; ++i) {
          server.use(applications[port].middlewares[i]);
      }
      for (const context in applications[port].paths) {
          if (!applications[port].paths.hasOwnProperty(context)) {
              continue;
          }

          server.use(mount(context, applications[port].paths[context]))
      }

      http.createServer(server.callback()).listen(port);
  }
}
