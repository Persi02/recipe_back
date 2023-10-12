const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
  label:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Role', roleSchema);