const ShoppingCart = require("../models/shoppingCart");

const list = async (req, res) => {
  try {
    console.log("Hello");
    let shoppingCarts = await ShoppingCart.find();
    res.status(200).json({
      data: shoppingCarts,
      success: true
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      success: false
    });
  }
}

const create = async (req, res) => {
  try {
    let shoppingCart = new ShoppingCart(req.body);
    shoppingCart = await shoppingCart.save();
    res.status(200).json({
      data: shoppingCart,
      success: true
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      success: false
    });
  }
}

const read = (req, res) => {}

const update = (req, res) => {}

const remove = (req, res) => {}

module.exports = {list, create, read, update, remove};