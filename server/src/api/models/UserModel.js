const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

userSchema.methods.token = function () {
  const expiresIn = 3600; 
  const iat = Math.floor(Date.now() / 1000);
 
  const payload = {
    id: this._id,
    email: this.email,
    createdAt: this.createdAt,
  };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h', 
  });
  return token

}


const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
