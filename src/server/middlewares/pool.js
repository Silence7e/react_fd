export default function (pool) {
  return function addPool(ctx, next) {
      ctx.pool = pool;
      return next();
  };
}
