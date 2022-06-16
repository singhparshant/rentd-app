const User = require("../models/user");

const list = async (req, res) => {
  try {
    let user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

const create = async (req, res) => {
  try {
    let user = new User(req.body);
    user = await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

const read = (req, res) => {}

const update = (req, res) => {}

const remove = (req, res) => {}

module.exports = {list, create, read, update, remove};