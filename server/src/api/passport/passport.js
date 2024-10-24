const { default: axios } = require("axios");
const userModel = require("../models/UserModel");
require("dotenv").config();
const jwtSimple = require("jwt-simple");
const secret = process.env.JWT_SECRET;
const passport = require("passport");
const GoogleStretegy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const config = require("../Config/Config");

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
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
    },

    async function (accessToken, refreshToken, profile, done) {
      console.log("Google profile:", profile);
      console.log("Google AccessToken:", accessToken);

      const firstName = profile.name.givenName || "No First Name";
      const lastName = profile.name.familyName || "No Last Name";
      const email = profile.emails[0].value;
      const picture = profile.photos[0].value;

      try {
        let user = await userModel.findOne({ email });
        if (!user) {
          user = new userModel({
            firstName,
            lastName,
            email,
            oauth: true,
          });
          await user.save();
        }

        token = jwtSimple.encode(
          {
            email,
            name: `${firstName} ${lastName}`,
            googleAccessToken: accessToken,
          },
          secret
        );

        const redirectUrl = `http://localhost:3000/dashboard?token=${token}`;
        console.log("Redirect URL:", redirectUrl);

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
    console.log("Redirect URL:", redirectUrl);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error in GoogleAuthCallback:", error);
    res.status(500).json({ success: false, msg: "Error during Google login" });
  }
};

passport.use(
  new FacebookStrategy(
    {
      clientID: config.FACEBOOK_CLIENT_ID,
      clientSecret: config.FACEBOOK_CLIENT_SECRET,
      callbackURL: config.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "emails", "name"],
    },
    async function (accessToken, refreshToken, profile, done) {
      token = accessToken;
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
      clientID: config.GITHUB_CLIENT_ID,
      clientSecret: config.GITHIUB_CLIENT_SECRET,
      callbackURL: config.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      token = accessToken;
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
exports.FacebookAuthCallback = (req, resp) => {
  try {
    if (!req.user) {
      throw new Error("User information is incomplete.");
    }

    const email = req.user.email || "No Email";
    if (email === "No Email") {
      return resp.redirect("/email-collection-page");
    }
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
    const redirectUrl = `http://localhost:3000/dashboard?token=${token}`;
    console.log("GitHub Redirect URL:", redirectUrl);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error in GitHubAuthCallback:", error);
    res.status(500).json({ success: false, msg: "Error during GitHub login" });
  }
};
