const mongoose = require("mongoose");
const jwt = require("jwt-simple");
require("dotenv").config();
const userSchema = mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  dateOfBirth: {
    day: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  gender: {
    type: String,
    required: false,
  },

  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

userSchema.methods.token = function () {
  const payload = {
    id: this._id,
    email: this.email,
    iat: Date.now()
  }
  const token = jwt.encode(payload, process.env.JWT_SECRET);
  return token
}


const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
