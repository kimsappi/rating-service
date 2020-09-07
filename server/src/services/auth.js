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
  return rows[0];
};

const getIndividualUserData = async id => {
  const query = {
    text: 'SELECT * FROM users WHERE id=$1;',
    values: [id],
    name: `Query user`
  };
  const {rows} = await pool.query(query);
  return rows[0];
};

module.exports = {
  createGuestAccount,
  getIndividualUserData
};
