const express = require("express");
const Product = require("../models/product");
const router = express.Router();

//getting all products
router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//add new product
router.post("/", async (req, res) => {
  try {
    let product = new Product(req.body);
    product = await product.save();
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err.message);
  }
});


module.exports = router;
