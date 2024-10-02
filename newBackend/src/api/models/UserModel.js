const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  FirstName: {
    required: true,
    type: String,
  },
  LastName: {
    required: true,
    type: String,
  },
  DateOfBirth: {
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
  Gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
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

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
