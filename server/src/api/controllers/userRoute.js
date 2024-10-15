const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwtSimple = require("jwt-simple");
const nodemailer = require("nodemailer");
const secret = process.env.JWT_SECRET;
const authEmail = process.env.authEmail;
const authPass = process.env.authPass;
const client_Secret = process.env.client_Secret;
const redirect_URL = process.env.redirect_URL;
const clientID = process.env.Cient_ID;
const passport = require('passport');
const GoogleStreategy = require('passport-google-oauth20').Strategy;


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
      const token = jwtSimple.encode(payload, secret);

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



passport.use(new GoogleStreategy({
  clientID: clientID,
  clientSecret: client_Secret,
  callbackURL: redirect_URL
}, async function (accessToken, refreshToken, profile, done) {
  console.log("Google profile:", profile); // Log the profile to inspect its structure
  try {
    let user = await userModel.findOne({ email: profile.emails[0].value });
    if (!user) {
      user = new userModel({
        firstName: profile.name.givenName || 'No Name', // Fallback if undefined
        lastName: profile.name.familyName || 'No Last Name', // Fallback if undefined
        email: profile.emails[0].value,
        oauth: true,
      });
      await user.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));


passport.serializeUser(function (user, done) {
  done(null, user)
}
)
passport.deserializeUser(function (user, done) {
  done(null, user)
}
)



passport.use(new GoogleStreategy({
  clientID: clientID,
  clientSecret: client_Secret,
  callbackURL: redirect_URL
},
async function (accessToken, refreshToken, profile, done) {
  console.log("Google profile:", profile); // Log the profile to inspect its structure
  try {
    let user = await userModel.findOne({ email: profile.emails[0].value });
    if (!user) {
      user = new userModel({
        firstName: profile.name.givenName || '', // Fallback if undefined
        lastName: profile.name.familyName || '',  // Fallback if undefined
        email: profile.emails[0].value,
        oauth: true,
      });
      await user.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});



exports.GoogleAuthCallback = (req, res) => {
  try {
    // Ensure req.user is defined
    if (!req.user) {
      throw new Error("User information is incomplete.");
    }

    // Extracting values from req.user
    const givenName = req.user.name?.givenName || req.user._json?.given_name || 'Guest';
    const familyName = req.user.name?.familyName || req.user._json?.family_name || 'No Last Name';

    // Ensure emails array exists and has at least one element
    const email = (req.user.emails && req.user.emails.length > 0)
      ? req.user.emails[0].value
      : (req.user._json?.email || 'No Email');

    // Include user's ID, name, and email in the token payload
    const tokenPayload = {
      id: req.user.id,                 // User ID
      name: `${givenName} ${familyName}`, // User's full name
      email: email,                   // User's email
    };
    
    // Encode the payload to create a JWT token
    const token = jwtSimple.encode(tokenPayload, secret);
    const redirectUrl = `http://localhost:3000/dashboard?token=${token}`;
    console.log("Redirect URL:", redirectUrl);
    
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error in GoogleAuthCallback:", error);
    res.status(500).json({ success: false, msg: "Error during Google login" });
  }
};



