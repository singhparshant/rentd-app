const ShoppingCart = require("../models/shoppingCart");
const User = require("../models/user");

const list = async (req, res) => {
  try {
    //console.log("Hello");
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
    let id = req.body.id;
    let user = User.findById(req.body.id);
    let shoppingCart = new ShoppingCart(user, []);
    shoppingCart = await shoppingCart.save();
    res.status(200).json({
      shoppingCart
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
     
    });
  }
}

const read = (req, res) => {}

const update = (req, res) => {
  console.log("in update")
  ShoppingCart.findOne().then((data) => {
    if (!data) {
      return res.status(404).json({
        message: "There are no shopping carts"
      });
    }
    else{
      console.log("data is: ", data)
    } 
  })
}

const remove = (req, res) => {}

module.exports = {list, create, read, update, remove};