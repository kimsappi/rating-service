const jwt = require('jsonwebtoken');
const config = require('./config');

const authenticationMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
      return res.status(401).json('auth error');
    else {
      jwt.verify(token, config.TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(401).json('auth error');
        else {
          req.user = user;
          next();
        }
      });
    }
  } catch(err) {
    return res.status(401).json('auth error');
  }
};

const generateJWT = data => 
  jwt.sign(data, config.TOKEN_SECRET, {expiresIn: config.tokenExpiry});

module.exports = {
  authenticationMiddleware,
  generateJWT
};
