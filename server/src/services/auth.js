const pool = require('../modules/db.js');

const { getUserFromApi } = require('./token');

const createAccount = async (id, username, firstName, lastName, imgUrl) => {
  const query = {
    text: `INSERT INTO users(id, username, firstName, lastName, imageurl)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`,
    values: [id, username, firstName, lastName, imgUrl]
  };
    
  const {rows} = await pool.query(query);
  return rows[0];
};

// Create guest account for the dev environment
const createGuestAccount = async () => {
  const rnd = Math.floor(Math.random() * Math.floor(99999));
  const username = `guest${rnd}`;
  const lastName = rnd.toString();

  const guestAccount = await createAccount(
    rnd, username, 'Guest', lastName, null
  );
  return guestAccount;
};

const getIndividualUserData = async id => {
  const query = {
    text: 'SELECT * FROM users WHERE id=$1;',
    values: [id],
    name: 'Query user'
  };
  const {rows} = await pool.query(query);
  return rows[0];
};

const apiLogin = async token => {
  try {
    const userData = await getUserFromApi(token);
    const user = await getIndividualUserData(userData.id);
    if (user)
      return user;
    else {
      const createdUser = await createAccount(
        userData.id, userData.login, null,
        null, userData.image_url
      );
      return createdUser;
    }
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
