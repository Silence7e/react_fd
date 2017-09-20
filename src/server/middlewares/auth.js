import { services } from 'server/database';

export default function () {
  return async function authorize(ctx, next) {
      if (ctx.req.headers && ctx.req.headers.authorization) {
          const hash = ctx.req.headers.authorization;
          const result = await services.getToken(ctx.pool, hash);
          if (result.rows.length > 0) {
              ctx.token = result.rows[0].hash;
          }
      }
      return next();
  };
}
