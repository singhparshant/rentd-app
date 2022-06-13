const express = require("express");
const User = require("../models/user");
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    let user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err.message);
  }
});


router.post("/", async (req, res) => {
  try {
    let user = new User(req.body);
    user = await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err.message);
  }
});


module.exports = router;
