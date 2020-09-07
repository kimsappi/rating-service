var express = require('express');
var router = express.Router();

const { getAllActiveOrderedByRating } = require('../services/users');
const authService = require('../services/auth');
const { generateJWT } = require('../modules/auth');

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

router.get('/refreshToken', async (req, res, next) => {
  try {
    const result = await authService.getIndividualUserData(req.user.id);
    const token = generateJWT(result);
    return res.status(200).json({...result, token: token});
  } catch(err) {
    console.error(err);
    return res.status(500).json(null);
  }
});

module.exports = router;
