const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  FirstName: {
    required: true,
    type: String
  },
  LastName: {
    required: true,
    type: String
  },
  DateOfBirth: {
    day: {
      type: Number,
      required: true,
      min: 1,
      max: 31
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12
    },
    year: {
      type: Number,
      required: true,
      min: 1980,
      max: new Date().getFullYear()
    }
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: false
  },

  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;