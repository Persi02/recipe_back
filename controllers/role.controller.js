const Role = require('../entity/Role.entity');

const createRole = async(req, res) => {
  const { label } = req.body;
  try {
    if(label) {
      const roleToCreate = new Role(req.body);
      const doc = await roleToCreate.save()
      return res.json(doc);
    }

    return res.status(400).json({ message: "label is required" });
  } catch(err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message })
  }
}

const getRoles = async(req, res) => {
  try {
    const roles = await Role.find();
    return res.json({ data: roles });

  } catch(err) {
    console.error(err.message);
    return res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = {
  createRole,
  getRoles
}