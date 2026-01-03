const express = require("express");
const {handleSignup, handleLogin, handleLogoutUser} = require("../controllers/user")

const router = express.Router();

router.post("/", handleSignup);
router.post("/login", handleLogin);
router.post("/logout", handleLogoutUser)

module.exports = router;