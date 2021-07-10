const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");

//Sign Up
router.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password, cpassword } = req.body;

  if (!firstname || !lastname || !email || !password || !cpassword) {
    return res.status(422).json({ error: "Enter field" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email Already exist" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Password not matching" });
    }

    const user = new User({
      firstname,
      lastname,
      email,
      password,
      cpassword,
    });

    await user.save();
    res.status(201).json({ message: "Stored successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//Login route
router.post("/signin", async (req, res) => {
  try {
    let authToken;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Enter field" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      authToken = await userLogin.generateAuthToken();
      res.cookie("authtoken", authToken, {
        expires: new Date(Date.now() + 3000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        res.json({ message: "Logged In Success" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//About Me
router.get("/about", authenticate, (req, res) => {
  res.send(req.user);
});

//Sign Out
router.get("/signout", (req, res) => {
  res.clearCookie("authtoken", {
    path: "/",
  });
  res.status(200).send("user logout");
});

module.exports = router;
