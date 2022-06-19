//"use strict";
const fs = require("fs");

const Product = require("../models/product");

const list = async (req, res) => {
  // handle request
  try {
    let products = await Product.find();
    res.status(200).json({
      data: products,
      success: true,
    });
  } catch (err) {
    res.status(400).res.status(500).json({
      success: false,
      err: "Request failed",
      message: err.message
    });
  }
}

const create = async (req, res) => {
  // check if the body of the request contains at least 1 property
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      success: false,
      err: "Bad request",
      message: "The request body is empty",
    });
  // handle request
  try {
    // create product in db
    let product = new Product(req.body);
    product = await product.save();
    // return created product
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      err: "Internal server error",
      message: err.message,
    });
  }
}

const read = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({
      success: false,
      err: "Bad request",
      message: "The request parameter is absent",
    });

  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        err: "Not found",
        message: "Product not found",
      });
    }
    product.productImages = product.productImages.map(imgId => {
      return fs.readFileSync(`${__dirname}/../storage/${imgId}`, 'base64');
    })

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      err: "Internal server error",
      message: err.message,
    });
  }
};

const update = async (req, res) => {
  let productId = req.params.id
  let update = req.body
  Product.findByIdAndUpdate(productId, { $set: update }, { new: true })
    .then(data => {
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Product not found with id " + req.params.id
        });
      }
      res.status(200).json({
        success: true,
        data: data,
        message: "Product successfully updated"
      });
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          success: false,
          message: "Product not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error updating product with id " + req.params.id
      });
    });
}

const remove = async (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Product not found with id " + req.params.id
        });
      }
      res.status(200).json({
        success: true,
        data: data,
        message: "Product successfully deleted!"
      });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          success: false,
          message: "Product not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        success: false,
        message: "Could not delete product with id " + req.params.id
      });
    });
}

module.exports = { list, create, read, update, remove };