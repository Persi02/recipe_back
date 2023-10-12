const Privacy = require("../entity/Privacy.entity")

const createPrivacy = async(req, res, next) => {
  const privacy = new Privacy(req.body);
  const doc = await privacy.save()
  if(doc) {
    res.json({ message: "Privacy created" });
    next()
  }  
}

const getPrivacy = async(req, res, next) => {
  const { privacy } = req.query;

  const found = await Privacy.findOne({
    label: privacy
  })

  res.json({ data: found });
  next()
  
}

module.exports = {
  createPrivacy,
  getPrivacy
}