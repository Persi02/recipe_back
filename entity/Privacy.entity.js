const mongoose = require('mongoose');

const PrivacySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Privacy', PrivacySchema)