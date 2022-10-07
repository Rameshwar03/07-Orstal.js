const express = require("express");
const User = require("../controllers/authController");
const View = require("../controllers/viewsController");

const router = express.Router();

// View Router
// if (req.cookie) {
//   router.get("/", View.dashboard);
// }
router.get("/hehe", View.landingPage);
router.get("/login", View.loginPage);
router.get("/signup", View.signUpPage);
router.post("/post", User.protect, View.posts);
// router.post("/updatePosts",User.protect,View.updatePosts);

module.exports = router;
