const express = require("express");

const controller = require("../controllers/userController");
const passportController = require("../passport/passport");
const passport = require("passport");
const multer = require("multer");
const productController = require("../controllers/productController");
const authMiddleware = require("../Middleware/authMiddleware");
const router = express.Router();

const storage = multer.memoryStorage();

const uploads = multer({ storage: storage });

router.post("/SignUp", uploads.single("profilePic"), controller.SignUp);
router.post("/SignIn", controller.SignIn);
router.post("/UserDetails", controller.GetUserDetails);
router.put("/Update/:id", controller.UpdateProfile);
router.post("/ForgotPassword", controller.ForgotPassword);
router.post("/ResetPassword", controller.ResetPassword);

// For Products
router.post(
  "/addProduct",
  authMiddleware,
  uploads.single("productPic"),
  productController.addProduct
);
router.get("/getProduct", productController.getProduct);
router.get(
  "/getProductById/:id",
  authMiddleware,
  productController.getProductById
);
router.put("/updateProductById/:id", productController.updateProductById);
router.delete("/deleteProdutct/:id", productController.deleteProdutct);

// google routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  passportController.GoogleAuthCallback
);

// facebook routes
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  passportController.FacebookAuthCallback
);

// GitHub routes
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  passportController.GithubAuthCallback
);

module.exports = router;
