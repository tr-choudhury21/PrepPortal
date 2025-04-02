const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid Email."],
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    // New: Store profile picture URL
    type: String,
    default: "https://via.placeholder.com/150",
  },
  bio: {
    // New: Short bio
    type: String,
    default: "Hey there! I'm using this platform.",
  },
  socialLinks: {
    // New: Object to store multiple social media links
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
  },
});

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

module.exports = mongoose.model("User", userSchema);
