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
      required: function () {
        return !!this.password; // Required if the user has a password (not Google OAuth)
      },
    },
    month: {
      type: Number,
      required: function () {
        return !!this.password; // Required if the user has a password (not Google OAuth)
      },
    },
    year: {
      type: Number,
      required: function () {
        return !!this.password; // Required if the user has a password (not Google OAuth)
      },
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
    type: String,
    required: function () {
      return !this.oauth; // Password is required if not using OAuth
    },
  },
  oauth: {
    type: Boolean, // Field to indicate if the user signed up via Google OAuth
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// JWT generation method
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
  return token;
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
