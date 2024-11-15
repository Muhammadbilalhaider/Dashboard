const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require('../Config/Config')

const userSchema = mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: false,
    type: String,
  },
  dateOfBirth: [
    {
      day: {
        type: Number,
        required: function () {
          return !!this.password;
        },
      },
      month: {
        type: Number,
        required: function () {
          return !!this.password;
        },
      },
      year: {
        type: Number,
        required: function () {
          return !!this.password;
        },
      },
    },
  ],

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
      return !this.oauth;
    },
  },
  profile: {
    require: true,
    type: String,
  },
  oauth: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
    unique:true,
    default: null,
  },
  githubId: {
    type: String,
    unique:true,
    default: null,
  },
  facebookId: {
    type: String,
    unique:true,
    default: null,
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

  const token = jwt.sign(payload,config.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
