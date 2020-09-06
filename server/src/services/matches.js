const pool = require('../modules/db.js');

const { calculateRatingChange } = require('../modules/rating');

class PlayerAndScore {
  constructor(username, score, id, rating) {
    this.username = username;
    this.score = score;
    this.id = id;
    this.rating = rating;
  };
};

const matchUserNameToId = (current, needle) => 
  current.username === needle;

const getInputPlayerIdsAndRatings = async (match) => {
  const query = {
    text: `SELECT id, rating, username FROM users
      WHERE username = $1 OR username = $2;`,
    values: [match.player1, match.player2],
    name: 'SelectUsers'
  };

  const {rows} = await pool.query(query);
  if (rows.length !== 2)
    throw `ERR_KSAPPI_INVALID_INPUT
Invalid usernames submitted: ('${match.player1}' and '${match.player2}')`;

  const player1 = rows.find(item => matchUserNameToId(item, match.player1));
  const player2 = rows.find(item => matchUserNameToId(item, match.player2));

  const players = [
    new PlayerAndScore(match.player1, match.score1, player1.id, player1.rating),
    new PlayerAndScore(match.player2, match.score2, player2.id, player2.rating)
  ];

  return players;
};

const structureMatchInput = async (match, submitter) => {
  const draw = match.score1 === match.score2;
  const players = await getInputPlayerIdsAndRatings(match);
  // Winner is usually listed as the player with the higher score,
  // but in the case of a draw the winner is the player with the lower rating
  const sortedPlayers = [...players].sort((a, b) => {
    draw ? a.rating - b.rating : b.score - a.score;
  });
  return {
    winner: sortedPlayers[0].id,
    winnerScore: sortedPlayers[0].score,
    loser: sortedPlayers[1].id,
    loserScore: sortedPlayers[1].score,
    draw: draw,
    submitter: submitter.id,
    ratingChange: calculateRatingChange(sortedPlayers[0], sortedPlayers[1])
  };
};

// Check that submitted usernames are unique, scores are positive integers, etc.
const checkMatchDataSurfaceValidity = match => {
  if (match.player1 === match.player2)
    throw 'ERR_KSAPPI_INVALID_INPUT Usernames are identical';
  if (!Number.isInteger(match.score1) || !Number.isInteger(match.score2))
    throw `ERR_KSAPPI_INVALID_INPUT
Invalid score ${match.score1} (${typeof match.score1}) or \
${match.score2} (${typeof match.score2})`;
};

const addNewMatch = async (matchData, submitter) => {
  checkMatchDataSurfaceValidity(matchData);
  const d = await structureMatchInput(matchData, submitter);
  const query = {
    text: `
INSERT INTO matches
    (winner, loser, winner_score, loser_score, rating_change, submitter, draw)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;`,
    values: [d.winner, d.loser, d.winnerScore, d.loserScore,
      d.ratingChange, d.submitter, d.draw],
    name: 'NewMatchSubmission'
  };

  const {rows} = await pool.query(query);
  return rows[0];
};

module.exports = {
  addNewMatch,
};
