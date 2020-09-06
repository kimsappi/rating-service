var express = require('express');
const { addNewMatch } = require('../services/matches');
var router = express.Router();

/* Submit new match */
router.post('/new', async (req, res, next) => {
  try {
    const results = await addNewMatch(req.body, req.user);
    return res.json(results);
  } catch(err) {
    console.error(err);
    return res.json(null);
  }
});

module.exports = router;
