const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { saveRedirectURL } = require("../middleware");
const router = express.Router();
const userController = require("../controllers/user.js");

router.route("/signup")
.get(userController.signupForm)
.post(wrapAsync(userController.signUp));

router.route("/login")
.get(userController.loginForm)
.post(saveRedirectURL,passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }),userController.loginAuth );

// logout route
router.get("/logout", userController.logOut);

module.exports = router;