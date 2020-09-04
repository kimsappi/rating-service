var express = require('express');
var router = express.Router();
const { getAllActiveOrderedByRating } = require('../services/users');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const results = await getAllActiveOrderedByRating();
  res.json(results);
});

module.exports = router;
