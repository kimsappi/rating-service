var express = require('express');
const { addNewMatch } = require('../services/matches');
var router = express.Router();

/* Submit new match */
router.post('/new', async (req, res, next) => {
  try {
    const results = await addNewMatch(req.body, req.user);
    return res.status(201).json(results);
  } catch(err) {
    console.error(err);
    return res.status(400).json(null);
  }
});

module.exports = router;
