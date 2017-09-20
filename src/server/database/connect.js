import pg from 'pg';

export default function (options) {
  process.on('unhandledRejection', function(e) {
      throw new Error(e.message);
  });
  const pool = new pg.Pool(options);
  return pool;
}
