var express = require('express');
var router = express.Router();

const {
  getAllActiveOrderedByRating,
  getSingleUserProfileData
} = require('../services/users');
const { authenticationMiddleware } = require('../modules/auth');

router.use(authenticationMiddleware);

/* GET users */
router.get('/', async (req, res, next) => {
  const alphaSort = req.query.sort && req.query.sort === 'alpha' ? true : false;
  try {
    const results = await getAllActiveOrderedByRating(alphaSort);
    return res.status(200).json(results);
  } catch(err) {
    console.error(err);
    return res.status(500).json(null);
  }
});

// Get some public data about a single user as well as their match history
router.get('/:id', async (req, res, next) => {
  try {
    // id 'me' is the user's own profile
    const queryParam = req.params.id === 'me' ? req.user.id : req.params.id;
    const results = await getSingleUserProfileData(queryParam);
    return res.status(200).json(results);
  } catch(err) {
    console.error(err);
    return res.status(400).json(null);
  }
});

module.exports = router;
