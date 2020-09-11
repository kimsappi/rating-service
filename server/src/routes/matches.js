var express = require('express');
const { addNewMatch } = require('../services/matches');
var router = express.Router();

const { authenticationMiddleware } = require('../modules/auth');

router.use(authenticationMiddleware);

/* Submit new match */
router.post('/new', async (req, res, next) => {
  try {
    const results = await addNewMatch(req.body, req.user);
    return res.status(201).json(results);
  } catch(err) {
    console.error(err);
    if (err.includes('ERR_KSAPPI_INVALID_INPUT'))
      return res.status(400).json(null);
    else
      return res.status(500).json(null);
  }
});

module.exports = router;
