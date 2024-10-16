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
const passport = require("passport");
const GoogleStreategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const Facebook_ID = process.env.Facebook_ID;
Facebook_Secret = process.env.Facebook_Secret;
facebook_Callback_URL = process.env.facebook_Callback_URL;
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
  } catch (error) {}
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

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStreategy(
    {
      clientID: clientID,
      clientSecret: client_Secret,
      callbackURL: redirect_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("Google profile:", profile);
      try {
        let user = await userModel.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = new userModel({
            firstName: profile.name.givenName || "",
            lastName: profile.name.familyName || "",
            email: profile.emails[0].value,
            oauth: true,
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: Facebook_ID,
      clientSecret: Facebook_Secret,
      callbackURL: facebook_Callback_URL,
      profileFields: ["id", "emails", "name"],
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("Facebook profile:", profile);

      const email =
        profile.emails && profile.emails.length > 0
          ? profile.emails[0].value
          : null;

      if (!email) {
        console.log("No email found in the profile");
        return done(new Error("No email found"), null);
      }

      try {
        let user = await userModel.findOne({ email: email });
        if (!user) {
          user = new userModel({
            firstName: profile.name.givenName || "No Name",
            lastName: profile.name.familyName || "No Last Name",
            email: email,
            oauth: true,
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

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
    if (!req.user) {
      throw new Error("User information is incomplete.");
    }

    const givenName =
      req.user.name?.givenName || req.user._json?.given_name || "Guest";
    const familyName =
      req.user.name?.familyName ||
      req.user._json?.family_name ||
      "No Last Name";

    const email =
      req.user.emails && req.user.emails.length > 0
        ? req.user.emails[0].value
        : req.user._json?.email || "No Email";

    const tokenPayload = {
      id: req.user.id,
      name: `${givenName} ${familyName}`,
      email: email,
    };
    const token = jwtSimple.encode(tokenPayload, secret);
    const redirectUrl = `http://localhost:3000/dashboard?token=${token}`;
    console.log("Redirect URL:", redirectUrl);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error in GoogleAuthCallback:", error);
    res.status(500).json({ success: false, msg: "Error during Google login" });
  }
};

exports.FacebookAuthCallback = (req, resp) => {
  try {
    if (!req.user) {
      throw new Error("User information is incomplete.");
    }

    const email = req.user.email || "No Email";
    if (email === "No Email") {
      return resp.redirect("/email-collection-page");
    }

    const tokenPayload = {
      id: req.user.id,
      name: `${req.user.firstName} ${req.user.lastName}`,
      email: email,
    };
    const token = jwtSimple.encode(tokenPayload, secret);
    const redirectUrl = `http://localhost:3000/dashboard?token=${token}`;
    console.log("Redirect URL:", redirectUrl);
    resp.redirect(redirectUrl);
  } catch (error) {
    console.error("Error in FacebookAuthCallback:", error);
    resp
      .status(500)
      .json({ success: false, msg: "Error during Facebook login" });
  }
};
