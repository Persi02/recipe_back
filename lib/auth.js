const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRound = 15;
require('dotenv').config()
const SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

const hashPassword = async(passToHash) => {
  return new Promise(async(resolve, reject) => {
    bcrypt.hash(passToHash, saltRound, (err, hash) => {
      if(err) {
        reject(err);
      }

      if(hash) {
        resolve(hash);
      } else {
        reject("Error when hashing password");
      }

    })
  })
}

const comparePassword = (userToLogPass, hashFromDB) => {
  return bcrypt.compareSync(userToLogPass, hashFromDB);
}

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET, {
    algorithm: 'HS256',
    expiresIn: 360
  })
}

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_SECRET, {
    algorithm: 'HS256',
    expiresIn: "1d"
  })
}

// authentication and authorization
const verifyToken = (req, res, next) => {
  const bearer = req.headers["authorization"];
  const token = bearer.split(' ')[1];

  return jwt.verify(token, SECRET, { algorithms: [ "HS256" ] }, (err, decoded) => {
    if(err) {
      return res.status(500).json({
        message: "Token is no longer valid"
      })
    }

    req.user = decoded;
    next();
  });
}

const refreshToken = ((req, res) => {
  const bearer = req.headers["authorization"];
  const token = bearer.split(' ')[1];

  if(!token) {
    return res.status(401).json({ message: "User not authorized" })
  }

  return jwt.verify(token, REFRESH_SECRET, { algorithms: [ "HS256" ] }, (err, decoded) => {
    if(err) {
      return res.status(500).json({
        message: "Error occured singing token"
      })
    }

    // TODO: check in BDD if user have access

    const refreshedToken = generateToken({
      username: decoded.username,
      email: decoded.email,
      password: decoded.password
    });

    res.json({
      token: refreshedToken
    });
  });
})

module.exports.auth = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  refreshToken,
  generateRefreshToken
}