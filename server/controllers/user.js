const User = require("../models/user");
const bcrypt = require("bcrypt")

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
    const passwordPlainText = req.body.password
    const passwordHash = await bcrypt.hash(passwordPlainText, 10);
    user.passwordHash = passwordHash;
    user = await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

const read = (req, res) => { }

const update = (req, res) => { }

const remove = async (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "User not found with id " + req.params.id
        });
      }
      res.status(200).json({
        success: true,
        data: data,
        message: "User successfully deleted!"
      });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          success: false,
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        success: false,
        message: "Could not delete User with id " + req.params.id
      });
    });
}

module.exports = { list, create, read, update, remove };