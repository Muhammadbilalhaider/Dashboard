const mongoose = require("mongoose");
<<<<<<< HEAD
const jwt = require("jwt-simple");
require("dotenv").config();
=======
const jwt = require("jsonwebtoken");
const config = require("../Config/Config");

>>>>>>> bilal-branch
const userSchema = mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
<<<<<<< HEAD
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
=======
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

>>>>>>> bilal-branch
  gender: {
    type: String,
    required: false,
  },
<<<<<<< HEAD

=======
>>>>>>> bilal-branch
  email: {
    required: true,
    type: String,
  },
  password: {
<<<<<<< HEAD
    required: true,
    type: String,
=======
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
    unique: false,
    default: null,
  },
  githubId: {
    type: String,
    unique: false,
    default: null,
  },
  facebookId: {
    type: String,
    unique: false,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
>>>>>>> bilal-branch
  },
});

userSchema.methods.token = function () {
<<<<<<< HEAD
  const payload = {
    id: this._id,
    email: this.email,
    iat: Date.now()
  }
  const token = jwt.encode(payload, process.env.JWT_SECRET);
  return token
}

=======
  const expiresIn = 3600;
  const iat = Math.floor(Date.now() / 1000);

  const payload = {
    id: this._id,
    email: this.email,
    createdAt: this.createdAt,
  };

  const token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
>>>>>>> bilal-branch

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
