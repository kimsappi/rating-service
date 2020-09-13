const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: config.max,
  idleTimeoutMillis: config.idleTimeoutMillis,
  connectionTimeoutMillis: config.connectionTimeoutMillis,
  ssl: config.env === 'test' ?
    false :
    {rejectUnauthorized: false}
});

module.exports = pool;
