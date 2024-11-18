const { default: axios } = require("axios");
const userModel = require("../models/UserModel");
require("dotenv").config();
const jwtSimple = require("jwt-simple");
const secret = process.env.JWT_SECRET;
const passport = require("passport");
const GoogleStretegy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,

  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_CALLBACK_URL,

  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
} = require("../Config/Config");

var token;

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

passport.use(
  new GoogleStretegy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },

    async function (accessToken, refreshToken, profile, done) {
      console.log("Google profile:", profile);
      console.log("Google AccessToken:", accessToken);

      let existingUser = await userModel.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const firstName = profile.name.givenName || "No First Name";
      const lastName = profile.name.familyName || "No Last Name";
      const email = profile.emails[0].value;
      const picture = profile.photos[0].value;
      const googleId = profile.id;

      try {
        let user = await userModel.findOne({ email });
        if (!user) {
          user = new userModel({
            firstName,
            lastName,
            email,
            profile: picture,
            googleId,
            oauth: true,
          });
          await user.save();
        }

        token = jwtSimple.encode(
          {
            email,
            name: `${firstName} ${lastName}`,
            googleAccessToken: accessToken,
            picture,
          },
          secret
        );

        const redirectUrl = `http://localhost:3000/dashboard?token=${token}`;

        return done(null, user, { token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

exports.GoogleAuthCallback = (req, res) => {
  try {
    if (!req.user) {
      throw new Error("User information is incomplete.");
    }
    const email = req.user.email || "No Email";
    if (email === "No Email") {
      return res.redirect("/email-collection-page");
    }

    const redirectUrl = `http://localhost:3000/dashboard?token=${token}`;

    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error in GoogleAuthCallback:", error);
    res.status(500).json({ success: false, msg: "Error during Google login" });
  }
};

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("Facebook profile:", profile);
      console.log("Facebook AccessToken:", accessToken);

      const displayName = profile.displayName || "No Name";
      const email =
        profile.emails && profile.emails.length > 0
          ? profile.emails[0].value
          : null;
      const picture =
        profile.photos && profile.photos.length > 0
          ? profile.photos[0].value
          : null;
      const facebookId = profile.id;
      // Check if email is null
      if (!email) {
        console.log("No email found, preventing sign in.");
        return done(null, false, {
          message: "No email found. Sign-in is not allowed.",
        });
      }

      try {
        let user = await userModel.findOne({ email });
        if (!user) {
          user = new userModel({
            firstName: displayName.split(" ")[0],
            facebookId,
            email,
            profile: picture,
            oauth: true,
          });
          await user.save();
        }

        token = jwtSimple.encode(
          {
            email,
            name: displayName,
            facebookAccessToken: accessToken,
          },
          secret
        );

        const redirectUrl = `http://localhost:3000/dashboard?token=${token}`;

        return done(null, user, { token });
      } catch (err) {
        console.error("Error retrieving user:", err);
        return done(err, null);
      }
    }
  )
);

exports.FacebookAuthCallback = (req, res) => {
  try {
    if (!req.user) {
      throw new Error("User information is incomplete.");
    }
    const email = req.user.email || "No Email";
    if (email === "No Email") {
      return res.redirect("/email-collection-page");
    }

    const redirectUrl = `http://localhost:3000/dashboard?token=${token}`;

    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error in GoogleAuthCallback:", error);
    res.status(500).json({ success: false, msg: "Error during Google login" });
  }
};

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ githubId: profile.id });

        if (existingUser) {
          return done(null, existingUser); // User already exists
        }

        const newUser = new User({
          githubId: profile.id,
          username: profile.username,
          email: profile.emails[0].value,
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        console.error("Error during GitHub authentication:", error);
        return done(error, null);
      }
    }
  )
);

exports.GithubAuthCallback = (req, res) => {
  try {
    if (!req.user) {
      throw new Error("User information is incomplete.");
    }

    const email = req.user.email || "No Email";
    if (email === "No Email") {
      return res.redirect("/email-collection-page");
    }

    const redirectUrl = `http://localhost:3000/dashboard?token=${token}`;

    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error in GithubAuthCallback:", error);
    res.status(500).json({ success: false, msg: "Error during GitHub login" });
  }
};
