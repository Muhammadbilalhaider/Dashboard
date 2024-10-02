const express = require("express");
const controller = require("../controllers/userRoute");

const router = express.Router();

router.post("/SignUp", controller.SignUp);
router.post("/SignIn", controller.SignIn);

module.exports = router;
