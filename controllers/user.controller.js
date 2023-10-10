const User = require('../entity/User.entity')

const createUser = async(req, res, next) => {
  const user = new User(req.body)
  const doc = await user.save()
  res.json({ message: "Created" })
}

module.exports = {
  createUser
}