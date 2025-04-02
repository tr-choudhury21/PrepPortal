const express = require("express");
const { register, login, logout, getUserProfile, updateProfile } = require("../controllers/userController");
const isUserAuthenticated = require("../middlewares/auth");


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isUserAuthenticated ,logout);
router.get("/userdetails", isUserAuthenticated, getUserProfile);
router.put("/profile", isUserAuthenticated, updateProfile);

module.exports = router;