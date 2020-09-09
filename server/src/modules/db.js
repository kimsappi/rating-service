const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  max: config.max,
  idleTimeoutMillis: config.idleTimeoutMillis,
  connectionTimeoutMillis: config.connectionTimeoutMillis,
  ssl: config.env === 'test' ?
    false :
    {rejectUnauthorized: false}
});

module.exports = pool;
