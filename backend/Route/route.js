const express = require('express');
const { SignUp, SignIn } = require('../RouteControl/userRoute');

const router = express.Router();

router.post('/SignUp', SignUp);
router.post('/SignIn', SignIn);

module.exports = router;