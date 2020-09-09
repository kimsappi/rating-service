const pool = require('../modules/db.js');

const { getUserFromApi } = require('./token');

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

const apiLogin = async token => {
  const userData = await getUserFromApi(token);
  try {
    const user = getIndividualUserData(userData.id);
    return user;
  } catch(err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  createGuestAccount,
  getIndividualUserData,
  apiLogin
};
