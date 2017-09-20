import Koa from 'koa';

const app = new Koa();

app.use(ctx => {
  ctx.throw(404);
});

export default app;
