var express = require('express');
var router = express.Router();

const authService = require('../services/auth');
const tokenService = require('../services/token');
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

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
  router.post('/apiLogin', async (req, res, next) => {
    try {
      const token = await tokenService.getToken(req.body.code);
      const result = await authService.apiLogin(token);
      const jwToken = generateJWT(result);
      return res.status(201).json({...result, token: jwToken});
    } catch(err) {
      console.error(err);
      return res.status(400).json(null);
    }
  });
}

module.exports = router;
