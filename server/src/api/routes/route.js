const express = require("express");
const controller = require("../controllers/userRoute");
const passport = require("passport");

const router = express.Router();

router.post("/SignUp", controller.SignUp);
router.post("/SignIn", controller.SignIn);
router.post("/ForgotPassword", controller.ForgotPassword);
router.post("/ResetPassword", controller.ResetPassword);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  controller.GoogleAuthCallback
);

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  controller.FacebookAuthCallback
);

module.exports = router;
