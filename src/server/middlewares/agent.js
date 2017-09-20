import MobileDetect from 'mobile-detect';

export default function authorize(ctx, next) {
  let md = new MobileDetect(ctx.req.headers['user-agent']);
  /*if (md.mobile()) {
      ctx.userAgent = 'mobile';
      if (ctx.path === '/') {
          ctx.redirect('/h5');
          ctx.status = 301;
      }
      else if (ctx.path === '/account/register') {
          if (ctx.querystring) {
              ctx.redirect('/h5/account/register?'+ctx.querystring);
          }
          else {
              ctx.redirect('/h5/account/register');
          }
          ctx.status = 301;
      }
      else {
          return next();
      }
  }*/
  ctx.userAgent = 'desktop';
  return next();
}

