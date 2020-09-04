const pool = require('../modules/db.js');

// Create guest account for the dev environment
const createGuestAccount = async () => {
  const rnd = Math.floor(Math.random() * Math.floor(99999));
  const username = `guest${rnd}`;
  const lastName = rnd.toString();

  const query = `
INSERT INTO users(id, username, firstName, lastName)
  VALUES (${rnd}, '${username}', 'Guest', '${lastName}')
  RETURNING *;`;
  const {rows} = await pool.query(query);
  return rows;
};

module.exports = {
  createGuestAccount,
};
