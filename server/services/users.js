const pool = require('../modules/db.js');

const getAllActiveOrderedByRating = async () => {
  const query = `SELECT * FROM users ORDER BY rating;`;
  const {rows} = await pool.query(query);
  return rows;
};

module.exports = {
  getAllActiveOrderedByRating,
}
