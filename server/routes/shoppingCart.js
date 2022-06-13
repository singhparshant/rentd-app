const express = require("express");
const Product = require("../models/product");
const ShoppingCart = require("../models/shoppingCart");
const User = require("../models/user");
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    console.log("Hello");
    let shoppingCarts = await ShoppingCart.find();
    res.status(200).json(shoppingCarts);
  } catch (err) {
    res.status(400).json(err.message);
  }
});


router.post("/", async (req, res) => {
  try {
    let shoppingCart = new ShoppingCart(req.body);
    shoppingCart = await shoppingCart.save();
    res.status(200).json(shoppingCart);
  } catch (err) {
    res.status(400).json(err.message);
  }
});


module.exports = router;
