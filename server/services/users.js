const pool = require('../modules/db.js');

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
};
