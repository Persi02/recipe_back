const User = require('../entity/User.entity')
const Role = require('..//entity/Role.entity');
const { hashPassword, comparePassword, generateToken, generateRefreshToken } = require('../lib/auth').auth;

const getAllUsers = async(req, res) => {
  try {
    const allUsers = await User.find();
    return res.json({
      data: allUsers
    });

  } catch(err) {
    console.log("Error occured getting all users");
    res.status(500).json({ message: "Internal server error" });
  }
}

const createUser = async(req, res, next) => {
  try {
    const user = new User(req.body);
    let role = null;

    const passHashed = await hashPassword(req.body.password);
    user.password = passHashed;
    if(req.body.role) {
      role = await Role.findOne({ label: req.body.role });
      user.role = role.id;
    } else {
      role = await Role.findOne({ label: "USER" });
      user.role = role.id;
    }

    user.avatar = null;

    const doc = await user.save()
    const token = generateToken({
      username: doc.username,
      email: doc.email,
      password: doc.password,
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
    return res.status(500).json({ message: err.message });
  }
}

const login = async(req, res, next) => {
  try {
    const userToFind = await User.findOne({
      $or: [
        { username: req.body.username },
        { email: req.body.email }
      ]
    })
    .populate('avatar');
    
    if(!userToFind) {
      return res.status(401).json({ message: "User does not exists" });
    }

    const isAuthenticate = comparePassword(req.body.password, userToFind.password);

    if(isAuthenticate) {
      const token = generateToken({
        username: userToFind.username,
        // email: userToFind.email,
        password: userToFind.password
      });

      const refreshToken = generateRefreshToken({
        username: userToFind.username,
        // email: userToFind.email,
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

const updateUser = async(req, res) => {
  const { username, email, id } = req.body;
  try {
    const updatedDoc = await User.findOneAndUpdate
    ({ _id: id }, 
    {
      username,
      email
    }, {
      new: true
    });

    return res.json({ message: "User updated", user: updatedDoc })

  } catch(err) {
    return res.status(500).json({ message: err.message });
    console.log(err)
  }
}

module.exports = {
  getAllUsers,
  createUser,
  login,
  updateUser
}