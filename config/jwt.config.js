const env = require(`../.env/${ process.env.NODE_ENV }`);
const jwtSecret = env.jwtSecret;
const jwt = require('jsonwebtoken');
const serviceUser = require('../services/user.service');

createToken = ({user = null, id = null}) => {
  const jwtToken = jwt.sign({ 
    sub: id || user.id.toString(),
    exp: Math.floor(Date.now() / 1000) + 60 * 20// 20min idéal
  }, jwtSecret);
  return jwtToken;
}

const checkExpirationToken = (token, res) => {
  const tokenExp = token.exp;
  const nowInSec = Math.floor(Date.now() / 1000);
  if (nowInSec <= tokenExp) {
    return token;
  } else if (nowInSec > tokenExp && ((nowInSec - tokenExp) < 86400 * 14)) {
    const refreshToken = createToken({id: token.sub});
    res.cookie('jwt', refreshToken, { secure: true, httpOnly: true });
    return jwt.verify(refreshToken, jwtSecret);
  } else {
    throw new Error('token expired');
  } 
}

const jwtAuth = {
  
  extractUserFromToken: async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      try {
        let decodedToken = jwt.verify(token, jwtSecret, { ignoreExpiration: true }); 
        decodedToken = checkExpirationToken(decodedToken, res);
        const user = await serviceUser.findUserPerId(decodedToken.sub);
        if (user) {
          req.user = user;
          next();
        } else {
          res.clearCookie('jwt');
          res.redirect('/');
        }
      } catch (err) {
        res.clearCookie('jwt');
        res.redirect('/'); 
      }
    } else {
      next();
    }
    
  },
  
  addJwtFeatures: (req, res, next) => {
    req.isAuthenticated = () => !!req.user;
    req.login = (user) => {
      const token = createToken({user});
      res.cookie('jwt', token, { secure: true, httpOnly: true });
    }
    req.logout = () => res.clearCookie('jwt');
    next();
  }
}

module.exports = jwtAuth;