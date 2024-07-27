const express = require("express");
const { register, login, logout } = require("../controllers/userController");
const isUserAuthenticated = require("../middlewares/auth");


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isUserAuthenticated ,logout);

module.exports = router;