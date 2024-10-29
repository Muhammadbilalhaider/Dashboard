const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwtSimple = require("jwt-simple");
const nodemailer = require("nodemailer");


const { MONGO_URL, JWT_SECRET,
  authPass,
  authEmail, } = require('../Config/Config')

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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new userModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
    });

    await user.save();

    const token = await user.token();
    console.log("access token ===>", token);
    return res.json({
      token,
      success: true,
      data: user,
      msg: "User created successfully.",
    });
  } catch (err) {
    console.log("Error handling -->", err);
    next();
  }
};

exports.SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({
      email,
    });

    if (!user) return res.json({ success: false, msg: "Email no exist" });

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

exports.GetUserDetails = async (req, resp) => {
  const { email } = req.body;
  const clientId = req.params.id;

  if (!email) {
    return resp.status(400).json({ success: false, msg: "Email is required" });
  }
  const users = await userModel.findOne({ email });
  if (users) {
    return resp.json({
      success: true,
      data: users,
      msg: "User details retrieved successfully",
    });
  } else {
    return resp.json({ msg: "Not Found" })
  }
}

// exports.UpdateProfile = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, gender, dateOfBirth } = req.body;
//     const userId = req.params.id

//     const user = await userModel.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Update fields if provided in request
//     user.firstName = firstName;
//     user.lastName = lastName;
//     user.email = email;
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);
//     }
//     if (gender) user.gender = gender;
//     if (dateOfBirth) user.dateOfBirth = dateOfBirth;

//     await user.save();
//     res.json({ success: true, message: "Profile updated successfully", data: user });







//   }
//   catch (error) {
//     res.status(500).json({ message: "Error updating profile", error });
//   }



// };


exports.UpdateProfile = async (req, res) => {
  try {
    const clientId = req.params.id;

    const updateFields = req.body;
    console.log("Update", updateFields)
    const updatedClient = await userModel.findByIdAndUpdate(
      clientId,
      updateFields,
      {
        new: true,
      }
    );

    if (!updatedClient) {
      return res
        .status(404)
        .json({ message: "client with the Given id was not found" });
    }

    return res.json({
      success: true,
      data: updatedClient,
      msg: "client updated",
    });
  }
  catch (err) {
    console.log(err);
  }
}



exports.ForgotPassword = async (req, resp, next) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: authEmail,
      pass: authPass,
    },
  });
  try {
    const existUser = await userModel.findOne({ email: email });
    if (!existUser) {
      resp.status(400).json({ message: "User Not registered" });
    } else {
      const payload = { email: email };
      const token = jwtSimple.encode(payload, JWT_SECRET);

      const link = `http://localhost:3000/resetpassword/${token}`;
      const mailOptions = {
        from: authEmail,
        to: email,
        subject: "Password Reset Link",
        text: `Click on the following link to reset your password: ${link}`,
      };

      await transporter.sendMail(mailOptions);
      await resp
        .status(200)
        .json({ message: "Password reset link sent to the email" });
    }
  } catch (error) { }
};

exports.ResetPassword = async (req, resp) => {
  const { accessToken, password } = req.body;
  if (!accessToken) {
    return resp.status(400).json({ message: "No token provided" });
  }

  try {
    const decodedPayload = jwtSimple.decode(accessToken, secret);
    console.log("Decoded Payload:", decodedPayload);
    const existUser = await userModel.findOne({ email: decodedPayload.email });
    if (!existUser) {
      resp.status(400).json({ message: "User Not Exist Please SignUp First" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    existUser.password = hashedPassword;
    await existUser.save();

    return resp.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error during password reset:", error);
    return resp
      .status(400)
      .json({ message: "Invalid token or error during password reset" });
  }
};
