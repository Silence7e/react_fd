import path from 'path';
import Koa from 'koa';
import createRouter from 'koa-router';
import sendFile from 'koa-sendfile';
import { asyncBusboy, randomString } from 'server/utilities';
import middlewares from 'server/middlewares';
import { services } from 'server/database';

export default function (options) {

  const dirname = path.dirname(process.argv.find(arg => arg.endsWith('.js') && !arg.startsWith('-')));

  const app = new Koa();
  const router = createRouter();

  router.get('/:id', async(ctx) => {
      if (ctx.query.name) {
          await sendFile(ctx, path.resolve(dirname, 'public', ctx.query.name));
      } else {
          await sendFile(ctx, path.resolve(dirname, 'public', ctx.params.id));
      }
  });

  router.get('/', async(ctx) => {

  });

  router.post('/', async(ctx) => {
      const tr = await services.getAllToggles(ctx.pool);
      const ir = await services.getAllImages(ctx.pool);
      const hr = await services.getAllHtmls(ctx.pool);

      let toggles = {};
      if (tr.rows.length > 0) {
          for (const item of tr.rows) {
              toggles = {...toggles, ...{[item.key]: item.value}};
          }
      }
      let images = {};
      if (ir.rows.length > 0) {
          for (const item of ir.rows) {
              images = {...images, ...{[item.key]: item.value}};
          }
      }
      let htmls = {};
      if (hr.rows.length > 0) {
          for (const item of hr.rows) {
              htmls = {...htmls, ...{[item.key]: item.value}};
          }
      }
      ctx.body =
      {
          ...toggles,
          ...images,
          ...htmls
      };
  });

  router.post('/upload/image', async(ctx) => {
      const {files} = await asyncBusboy(ctx.req, options);
      ctx.body =
      {
          'path': files[0].fileName
      };
  });

  router.post('/login', async(ctx) => {
      const {fields} = await asyncBusboy(ctx.req, options);
      if (fields.username === 'admin' && fields.password === options.password) {
          let result;
          const hash = randomString(16);
          try {
              result = await services.addToken(ctx.pool, hash);
          } catch (error) {
              ctx.status = 401;
              ctx.type = 'application/json;charset=UT F-8';
              ctx.body =
              {
                  message: "登录失败"
              };
          }
          if (result) {
              ctx.body =
              {
                  hash
              };
          }
      }
      else {
          ctx.status = 401;
          ctx.type = 'application/json;charset=UTF-8';
          ctx.body =
          {
              message: "密码错误"
          };
      }
  });

  router.post('/logout', async(ctx) => {
      if (ctx.token) {
          await services.deleteToken(ctx.pool, ctx.token);
      }
      ctx.body = {};
  });


  router.post('/toggles', async(ctx) => {
      if (ctx.token) {
          const {fields} = await asyncBusboy(ctx.req, options);
          await services.setToggles(ctx.pool, fields);
          ctx.body =
          {
              message: "修改成功"
          };
      }
      else {
          ctx.status = 401;
          ctx.type = 'application/json;charset=UTF-8';
          ctx.body =
          {
              message: "未登录"
          };
      }
  });

  router.post('/images', async(ctx) => {
      if (ctx.token) {
          const {fields} = await asyncBusboy(ctx.req, options);
          await services.setImages(ctx.pool, fields);
          ctx.body =
          {
              message: "修改成功"
          };
      }
      else {
          ctx.status = 401;
          ctx.type = 'application/json;charset=UTF-8';
          ctx.body =
          {
              message: "未登录"
          };
      }
  });

  router.post('/htmls', async(ctx) => {
      if (ctx.token) {
          const {fields} = await asyncBusboy(ctx.req, options);
          await services.setHtmls(ctx.pool, fields);
          ctx.body =
          {
              message: "修改成功"
          };
      }
      else {
          ctx.status = 401;
          ctx.type = 'application/json;charset=UTF-8';
          ctx.body =
          {
              message: "未登录"
          };
      }
  });

  app.use(middlewares.auth());
  app.use(router.routes()).use(router.allowedMethods());

  return app;
}
