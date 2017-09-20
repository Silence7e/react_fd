import Koa from 'koa';
import createRouter from 'koa-router';
import { services } from 'server/database';

const app = new Koa();

const router = createRouter();

router.get('/:locale', async (ctx) => {
  const result = await services.getAllLocales(ctx.pool);
  if (result.rows.length > 0) {
      let locales = {};
      for (const item of result.rows) {
          locales = {...locales, ...{[item.key]:item.value}};
      }
      ctx.body = locales;
  }
  else {
      ctx.body = {};
  }
});

app.use(router.routes()).use(router.allowedMethods());

export default app;
