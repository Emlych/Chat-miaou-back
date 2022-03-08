//erreurs récurrentes :
// oubli d'export de la route

const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

const User = require("../models/User");

//password management
//npm install uid2 crypto-js
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

//store pictures on Cloudinary
//npm install cloudinary
//Credentials for cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//create a new user
router.post("/user/signup", async (req, res) => {
  console.log("route: /user/signup");
  try {
    if (!req.fields.username) {
      res.status(400).json({ message: "No username provided" });
    }
    if (!req.fields.password) {
      res.status(400).json({ message: "No password provided" });
    }
    if (await User.findOne({ username: req.fields.username })) {
      res.status(400).json({ message: "Username already taken" });
    } else {
      //generate hash with provided password, and token
      const password = req.fields.password;
      const newSalt = uid2(16);
      const newHash = SHA256(password + newSalt).toString(encBase64);
      const newToken = uid2(16);

      //create new user
      const newUser = new User({
        username: req.fields.username,
        token: newToken,
        hash: newHash,
        salt: newSalt,
      });

      //upload avatar on cloudinary if provided
      const avatarToUpload = req.files.avatar.path;
      const result = await cloudinary.uploader.upload(avatarToUpload, {
        public_id: `chat-miaou/users/${newUser._id}`,
      });
      if (avatarToUpload) newUser["avatar"] = result;

      //register new user
      await newUser.save();
      res.json({ newUser: newUser });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//login
router.post("/user/login", async (req, res) => {
  console.log("route: /user/login");
  try {
    //find user with provided username
    const searchedUser = await User.findOne({ username: req.fields.username });

    //compare hash
    const password = req.fields.password;
    const userSalt = searchedUser.salt;
    const newHash = SHA256(password + userSalt).toString(encBase64);
    if (newHash === searchedUser["hash"]) {
      res.json({ message: "You can login ", searchedUser });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
