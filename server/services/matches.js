const pool = require('../modules/db.js');

class PlayerAndScore {
  constructor(username, score) {
    this.username = username;
    this.score = score;
  };
};

const structureMatchInput = async (match, submitter) => {
  const draw = match.score1 === match.score2;
  const players = [
    new PlayerAndScore(match.player1, match.score1),
    new PlayerAndScore(match.player2, match.score2)
  ];
  const sortedPlayers = [...players].sort((a, b) => a.score - b.score);
  return {
    winner: sortedPlayers[0].username,
    winnerScore: sortedPlayers[0].score,
    loser: sortedPlayers[1].username,
    loserScore: sortedPlayers[1].score,
    draw: draw,
    submitter: sortedPlayers[0].username,
    ratingChange: 0
  };
};

const playerIdQuery = placeholder => 
  `SELECT id FROM users WHERE username = ${placeholder}`
;

const addNewMatch = async (matchData, submitter) => {
  const d = await structureMatchInput(matchData, submitter);
  const query = {
    text: `
INSERT INTO matches
    (winner, loser, winner_score, loser_score, rating_change, submitter, draw)
  VALUES (${playerIdQuery('$1')}, ${playerIdQuery('$2')}, $3, $4, $5, $6, $7) RETURNING *;`,
    values: [d.winner, d.loser, d.winnerScore, d.loserScore,
      d.ratingChange, d.submitter, d.draw],
    name: 'NewMatchSubmission'
  };

  const {rows} = await pool.query(query);
  return rows;
};

module.exports = {
  addNewMatch,
};
