const express = require("express");
const controller = require("../controllers/userRoute");

const router = express.Router();

router.post("/SignUp", controller.SignUp);
router.post("/SignIn", controller.SignIn);
router.post("/ForgotPassword", controller.ForgotPassword);
router.post("/ResetPassword", controller.ResetPassword);
router.post("/GoogleSignin", controller.GoogleAuth);
router.get("/GoogleCallback", controller.GoogleAuthCallback);

module.exports = router;
