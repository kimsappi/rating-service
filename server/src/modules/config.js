const config = require('../../.env.json');

const constants = {
  maxConnections: 10,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 10000 
}

module.exports = {
  ...config,
  ...constants
};
