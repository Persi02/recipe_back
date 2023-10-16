const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  nameHashed: {
    type: String,
    requried: true
  }
})

module.exports = mongoose.model('Image', imageSchema);