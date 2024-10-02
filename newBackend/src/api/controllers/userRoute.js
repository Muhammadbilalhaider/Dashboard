const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.SignUp = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const { email } = req.body;
    // find if user exists
    let user = await userModel.findOne({
      email,
    });

    // already exists
    if (user != null) {
      return res.send(
        "This email already exists. You cannot create a new account with the same email address."
      );
    }

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user object with the hashed password
    user = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
    });

    // Save the user object to the database
    await user.save();

    // Generate an access token for the user
    const accessToken = await user.token();
    console.log("access token ===>", accessToken);
    return res.json({
      accessToken,
      success: true,
      data: user,
      msg: "User created successfully.",
    });
  } catch (err) {
    console.log("Error handling -->", err);
    next();
  }
};

// login user
exports.SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    //find if user exist

    let user = await userModel.findOne({
      email,
    });

    if (!user) return res.json({ success: false, msg: "Email no exist" });

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.json({ success: false, msg: "incorrect password" });

    var accessToken = await user.token();

    console.log("access token ==>", accessToken);

    return res.json({
      accessToken,
      success: true,
      data: user,
      msg: "User logged In successfully",
    });
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong" });
  }
};
