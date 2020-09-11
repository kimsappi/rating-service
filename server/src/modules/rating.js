const calculateRatingChange = (winner, loser) => {
  // User should never go below 1 rating (arbitrary, but a good idea IMO)
  // and there should be a reasonable cap for upsets
  const maxRatingChange = Math.min(loser.rating - 1, 50);

  // Result should probably depend on how close the game was (range 0.2 - 2.2)
  const scoreCorrectionFactor = winner.score === loser.score ?
    0.5 :
    0.2 + winner.score / (winner.score + loser.score);

  // Negative if winner was favourite
  const ratingGap = loser.rating - winner.rating;

  const winProbability = 1 / (1 + Math.pow(10, ratingGap / 400));

  const ratingChange = 
    Math.floor(30 * (scoreCorrectionFactor - winProbability));

  return Math.min(maxRatingChange, ratingChange);
};

module.exports = {
  calculateRatingChange
};
