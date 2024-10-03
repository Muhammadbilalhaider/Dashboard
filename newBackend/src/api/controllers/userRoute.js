const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwtSimple = require("jwt-simple");
const nodemailer = require('nodemailer');
const secret = process.env.JWT_SECRET;
exports.SignUp = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const { email } = req.body;
    let user = await userModel.findOne({
      email,
    });

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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
    });

    await user.save();

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


exports.ForgotPassword = async (req, resp, next) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'haiderb894@gmail.com',
      pass: 'aqox qphq zhgy xwia',
    },
  });
  try {
    const existUser = await userModel.findOne({ email: email });
    if (!existUser) {
      resp.status(400).json({ message: 'User Not registered' });
    } 
    else 
    {
      const payload = { email: email };
      const token = jwtSimple.encode(payload, secret);

      const link = `http://localhost:3000/resetpassword/${token}`;
      const mailOptions = {
        from: 'haiderb894@gmail.com',
        to: email,
        subject: 'Password Reset Link',
        text: `Click on the following link to reset your password: ${link}`,
      };

      await transporter.sendMail(mailOptions);
      await resp.status(200).json({ message: 'Password reset link sent to the email' });
    }

  } catch (error) {

  }
} 