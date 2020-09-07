var express = require('express');
var router = express.Router();

const { getAllActiveOrderedByRating } = require('../services/users');

/* GET users */
router.get('/', async (req, res, next) => {
  try {
    const results = await getAllActiveOrderedByRating();
    return res.status(200).json(results);
  } catch(err) {
    console.error(err);
    return res.status(500).json(null);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const results = await getSingleUserProfileData(req.params.id);
    return res.status(200).json(results);
  } catch(err) {
    console.error(err);
    return res.status(500).json(null);
  }
});

module.exports = router;
