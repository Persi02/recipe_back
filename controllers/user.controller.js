const User = require('../entity/User.entity')
const { hashPassword, comparePassword } = require('../lib/auth').auth;

const createUser = async(req, res, next) => {
  try {
    const user = new User(req.body)
    const passHashed = await hashPassword(req.body.password);
    user.password = passHashed;

    const doc = await user.save()
    res.json(
      { 
        message: "Created",
        data: doc
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
      return res.status(201).json({
        user: userToFind
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