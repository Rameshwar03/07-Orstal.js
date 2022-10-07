const express = require("express");
const User = require("../controllers/authController");
const router = express.Router();

router.route("/signup").post(User.signup);

router.route("/login").post(User.login);
router.route("/logout").post(User.logout);

module.exports = router;
