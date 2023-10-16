const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }
  ],
  avatar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image"
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema);