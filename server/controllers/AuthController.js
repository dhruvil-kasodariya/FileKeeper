const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//  controller for regisrer User
const registerUser = async (req, res) => {
  try {
    const { username, useremail, password } = req.body;

    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Input validation
    if (!username) return res.status(400).send({ error: "Enter User Name" });
    if (!useremail || !emailRegex.test(useremail))
      return res.status(400).send({ error: "Email is not Valid or Empty" });
    if (!password) return res.status(400).send({ error: "Enter Password" });

    // Encrypt the password
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_KEY
    ).toString();

    // Create a new user
    const newUser = new User({
      username,
      useremail,
      password: encryptedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate JWT token
    const accessToken = jwt.sign(
      {
        id: savedUser._id.toString(),
      },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );

    // Respond with user data and JWT token
    const { password: _, ...userData } = savedUser._doc;
    res.status(201).send({ ...userData, accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Input validation
  if (!username) return res.status(400).send({ error: "Enter User Name" });
  if (!password) return res.status(400).send({ error: "Enter Password" });

  try {
    // Find user by username
    const user = await User.findOne({ username: username });

    if (!user) return res.status(401).json({ error: "User not found" });

    // Decrypt stored password
    const decryptPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_KEY
    ).toString(CryptoJS.enc.Utf8);

    //  Comparison of passwords
    if (decryptPassword !== req.body.password) {
      res.status(401).send({ error: "Wrong Password" });
      return;
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );

    // Respond with user data and JWT token
    const { password: _, ...userData } = user._doc;
    return res.status(200).json({ ...userData, accessToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
};
