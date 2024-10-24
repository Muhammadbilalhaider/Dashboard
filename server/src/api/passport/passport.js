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
      profileFields: ["id", "displayName", "photos", "email"], // Ensure these fields are requested
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

            email,
            picture, // Save profile picture if desired
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
        console.log("Redirect URL:", redirectUrl);

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
    console.log("Redirect URL:", redirectUrl);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error in GoogleAuthCallback:", error);
    res.status(500).json({ success: false, msg: "Error during Google login" });
  }
};

passport.use(
  new GitHubStrategy(
    {
      clientID: config.GITHUB_CLIENT_ID,
      clientSecret: config.GITHUB_CLIENT_SECRET,
      callbackURL: config.GITHUB_CALLBACK_URL,
    },

    async function (accessToken, refreshToken, profile, done) {
      console.log("GitHub profile:", profile);
      console.log("GitHub AccessToken:", accessToken);

      const firstName = profile.displayName || "No First Name"; // GitHub doesn't provide first/last name
      const lastName = ""; // Leave empty or handle if needed
      const picture = profile.photos[0].value;

      try {
        // Fetch the user's email from GitHub
        const emailResponse = await axios.get(
          "https://api.github.com/user/emails",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const email =
          emailResponse.data.length > 0
            ? emailResponse.data[0].email
            : "No Email"; // Use the primary email

        // Check if the user already exists
        let user = await userModel.findOne({ email });
        if (!user) {
          // Create a new user if it doesn't exist
          user = new userModel({
            firstName,
            lastName,
            email,
            oauth: true,
            picture, // Save the profile picture if needed
          });
          await user.save();
        }

        token = jwtSimple.encode(
          {
            email,
            name: `${firstName} ${lastName}`,
            githubAccessToken: accessToken,
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

exports.GithubAuthCallback = (req, res) => {
  try {
    if (!req.user) {
      throw new Error("User information is incomplete.");
    }

    // Assuming user creation is successful and user is retrieved
    const email = req.user.email || "No Email";
    if (email === "No Email") {
      return res.redirect("/email-collection-page");
    }

    const token = req.user.token; // Ensure you have the token ready from done()
    const redirectUrl = `http://localhost:3000/dashboard?token=${token}`;
    console.log("Redirect URL:", redirectUrl);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error in GithubAuthCallback:", error);
    res.status(500).json({ success: false, msg: "Error during GitHub login" });
  }
};
