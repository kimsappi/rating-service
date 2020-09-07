var express = require('express');
var router = express.Router();

const authService = require('../services/auth');
const { generateJWT } = require('../modules/auth');

router.get('/', async (req, res, next) => {
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
