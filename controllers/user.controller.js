const User = require('../entity/User.entity')
const { hashPassword, comparePassword, generateToken, generateRefreshToken } = require('../lib/auth').auth;

const createUser = async(req, res, next) => {
  try {
    const user = new User(req.body)
    const passHashed = await hashPassword(req.body.password);
    user.password = passHashed;

    const doc = await user.save()
    const token = generateToken({
      username: doc.username,
      email: doc.email,
      password: doc.password
    });

    const refreshToken = generateRefreshToken({
      username: doc.username,
      email: doc.email,
      password: doc.password
    })

    res.json(
      { 
        message: "Created",
        data: doc,
        token,
        refreshToken
      }
    )
  } catch(err) {
    console.error(err.message);
  }
}

const login = async(req, res, next) => {
  try {
    const userToFind = await User.findOne({ username: req.body.username });
    if(!userToFind) {
      return res.status(401).json({ message: "User does not exists" });
    }

    const isAuthenticate = comparePassword(req.body.password, userToFind.password);

    if(isAuthenticate) {
      const token = generateToken({
        username: userToFind.username,
        email: userToFind.email,
        password: userToFind.password
      });

      const refreshToken = generateRefreshToken({
        username: userToFind.username,
        email: userToFind.email,
        password: userToFind.password
      })

      return res.status(201).json({
        user: userToFind,
        token,
        refreshToken
      })
    } else {
      return res.status(401).json({
        message: "username or password incorrect"
      })
    }
  } catch(err) {
    console.error(err.message);
  }
}

module.exports = {
  createUser,
  login
}