const express = require("express");
const router = express.Router({ mergeParams: true });

const { signup, verifyuser, login, getotp, logout } = require("../controllers/authController");

router.post("/getotp", getotp);
router.post("/signup", signup);
router.post("/verifyuser", verifyuser);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;