const pool = require('../modules/db.js');

const getSingleUserProfileData = async id => {
  const searchColumn = isNaN(id) ? 'username' : 'id';
  const searchValue = isNaN(id) ? id : parseInt(id);
  const matchesCondition = isNaN(id) ?
    'winner_username = $1 OR loser_username = $1' :
    'winner_id = $1 OR loser_id = $1';

  const matchesQuery = {
    text: `SELECT * FROM matches_with_users WHERE ${matchesCondition};`,
    values: [searchValue],
  };
  const userQuery = {
    text: `SELECT id, username, firstname, imageurl
FROM users WHERE ${searchColumn} = $1;`,
    values: [searchValue],
  };

  const user = await pool.query(userQuery);
  const matches = await pool.query(matchesQuery);

  return {
    user: user.rows[0],
    matches: matches.rows
  };
};

const getAllActiveOrderedByRating = async () => {
  const query = `
SELECT id, username, rating, imageUrl
  FROM users
  ORDER BY rating;`;
  const {rows} = await pool.query(query);
  return rows;
};

module.exports = {
  getAllActiveOrderedByRating,
  getSingleUserProfileData
};
