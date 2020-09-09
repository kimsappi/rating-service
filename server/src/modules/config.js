const env = process.env.NODE_ENV;

const config = require(`../../.env.${env}.json`);

const constants = {
  maxConnections: 10,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 10000,
  tokenExpiry: '7d'
}

module.exports = {
  ...config,
  ...constants,
  env
};
