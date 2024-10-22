const { default: axios } = require("axios");
const userModel = require("../models/UserModel");
require("dotenv").config();
const jwtSimple = require("jwt-simple");
const secret = process.env.JWT_SECRET;
const passport = require("passport");
const GoogleStreategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
// const GithubAuthCallback = require("passport-github").Strategy;
const Facebook_ID = process.env.Facebook_ID;

Facebook_Secret = process.env.Facebook_Secret;

const Github_ID = process.env.Github_ID;
Github_Secret = process.env.Github_Secret;

facebook_Callback_URL = process.env.facebook_Callback_URL;
github_Callback_URL = process.env.github_Callback_URL;

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStreategy(
    {
      clientID: process.env.GOOGLE_Cient_ID,
      clientSecret: process.env.GOOGLE_client_Secret,
      callbackURL: process.env.GOOGLE_redirect_URL,
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
      console.log("accessToken", accessToken);
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

passport.use(
  new GitHubStrategy(
    {
      clientID: Github_ID,
      clientSecret: Github_Secret,
      callbackURL: "http://localhost:5000/user/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Fetch the user's emails from GitHub
        const response = await axios.get("https://api.github.com/user/emails", {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });

        const emails = response.data;
        const primaryEmail = emails.find((email) => email.primary);

        if (!primaryEmail) {
          return done(null, false, { message: "No primary email found" });
        }

        console.log("GitHub profile:", profile);
        console.log("Primary email:", primaryEmail.email);

        // For demonstration, we can return the profile with the primary email
        return done(null, { ...profile, email: primaryEmail.email });
      } catch (error) {
        console.error("Error fetching emails from GitHub:", error);
        return done(error);
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

exports.GithubAuthCallback = (req, res) => {
  try {
    if (!req.user) {
      throw new Error("User information is incomplete.");
    }

    const email = req.user.email || "No Email";
    if (email === "No Email") {
      return res.redirect("/email-collection-page");
    }

    const tokenPayload = {
      id: req.user.id,
      name: `${req.user.firstName} ${req.user.lastName}`,
      email: email,
    };
    const token = jwtSimple.encode(tokenPayload, secret);
    const redirectUrl = `http://localhost:3000/dashboard?token=${token}`;
    console.log("GitHub Redirect URL:", redirectUrl);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error in GitHubAuthCallback:", error);
    res.status(500).json({ success: false, msg: "Error during GitHub login" });
  }
};
