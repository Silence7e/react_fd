import path from 'path';
import Koa from 'koa';
import compress from 'koa-compress';
import sendFile from 'koa-sendfile';
import favicon from './favicon';
import createRouter from 'koa-router';

const dirname = path.dirname(process.argv.find(arg => arg.endsWith('.js') && !arg.startsWith('-')));

export default function (options) {

  const router = createRouter();
  let types = ['appcache', 'html', 'htm', 'js', 'locale.json', 'css', 'ico',
      'png', 'jpg', 'jpeg', 'svg', 'gif', 'woff', 'woff2', 'ttf', 'eot'];
  if (process.argv.find(arg => arg === '--map')) {
      types = [...types, 'map'];
  }

  types.forEach(type =>
      router.get(`*/:name.${type}`, async(ctx) => {
          await sendFile(ctx, path.resolve(dirname,  '.' + ctx.path));
      }));

  router.get('*', async(ctx) => {
      await sendFile(ctx, path.resolve(dirname, 'public/index.html'));
  });

  const app = new Koa();
  app.use(compress({
      filter: (contentType) => /\.(html|htm|js|css)$/i.test(contentType),
      threshold: 2048,
      flush: require('zlib').Z_SYNC_FLUSH
  }));
  app.use(favicon());
  app.use(router.routes()).use(router.allowedMethods());

  return app;
}
