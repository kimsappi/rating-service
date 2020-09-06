var express = require('express');
var router = express.Router();
const { getAllActiveOrderedByRating } = require('../services/users');

/* GET users */
router.get('/', async (req, res, next) => {
  try {
    const results = await getAllActiveOrderedByRating();
    return res.json(results);
  } catch(err) {
    console.error(err);
    return res.json(null);
  }
});

module.exports = router;
