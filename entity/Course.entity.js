const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  privacy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Privacy'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  link: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: false,
    min: 0,
    max: 5
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Course', CourseSchema)