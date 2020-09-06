var express = require('express');
var router = express.Router();

const authService = require('../services/auth');
const { generateJWT } = require('../modules/auth');

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  router.post('/createGuest', async (req, res, next) => {
    try {
      const results = await authService.createGuestAccount();
      const token = generateJWT(results);
      return res.status(201).json({...results, token: token});
    } catch(err) {
      console.log(err);
      return res.status(409).json(null);
    }
  });
}

module.exports = router;
