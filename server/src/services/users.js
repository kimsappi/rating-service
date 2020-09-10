const pool = require('../modules/db.js');

const getSingleUserProfileData = async id => {
  const searchColumn = isNaN(id) ? 'username' : 'id';
  const searchValue = isNaN(id) ? id : parseInt(id);
  const matchesCondition = isNaN(id) ?
    'winner_username = $1 OR loser_username = $1' :
    'winner_id = $1 OR loser_id = $1';

  const matchesQuery = {
    text: `SELECT * FROM matches_with_users
      WHERE ${matchesCondition}
      ORDER BY "time" DESC
      LIMIT 30;`,
    values: [searchValue],
  };
  // COUNT returns BIGINT, which is cast as a string
  const userQuery = {
    text: `SELECT id, username, firstname, imageurl, 
        (SELECT COUNT(*) FROM matches_with_users WHERE ${matchesCondition})
          AS match_count
      FROM users WHERE ${searchColumn} = $1;`,
    values: [searchValue],
  };

  const user = await pool.query(userQuery);
  const matches = await pool.query(matchesQuery);

  return {
    user: {...user.rows[0], match_count: parseInt(user.rows[0].match_count)},
    matches: matches.rows
  };
};

const getAllActiveOrderedByRating = async alphaSort => {
  const orderBy = alphaSort ? '"username" ASC' : 'rating DESC';
  const query = `
SELECT id, username, imageUrl
  FROM users
  WHERE active = TRUE
  ORDER BY ${orderBy};`;
  const {rows} = await pool.query(query);
  return rows;
};

module.exports = {
  getAllActiveOrderedByRating,
  getSingleUserProfileData
};
