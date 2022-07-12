//import paginate from 'jw-paginate';

const fs = require("fs");
const jwt = require("jsonwebtoken");

const Product = require("../models/product");

const list = async (req, res) => {
  try {
    // Server-side pagination logic
    var page = req.query.page || 1;
    var limit = parseInt(req.query.limit) || 4;
    var skipIndex = (page - 1) * limit;

    const queryObject = {
      $and: [
        {
          monthlyPrice: req.query.monthlyPrice && {
            $lte: parseFloat(req.query.monthlyPrice),
          },
        },
        {
          minDuration: req.query.minDuration && {
            $gte: parseInt(req.query.minDuration),
          },
        },
        {
          category: req.query.categories && {
            $in: req.query.categories,
          },
        },
        {
          avgRating: req.query.avgRating && {
            $gte: req.query.avgRating,
          },
        },
      ],
    };
    var products = await Product.find(queryObject).skip(skipIndex).limit(limit);
    var productCount = await Product.find(queryObject).count();
    var totalPages = Math.ceil(productCount / limit);

    products.map((product) => {
      product.productImages = product.productImages.map((imgId) => {
        try {
          return fs.readFileSync(
            `${__dirname}/../storage/productImages/${imgId}`,
            "base64"
          );
        } catch (error) {
          console.log(error);
          return "";
        }
      });
    });

    return res.status(200).json({
      data: products,
      paging: {
        total: productCount,
        page: page,
        pages: totalPages,
      },
    });
  } catch (err) {
    return res.status(500).json({
      err: "Request failed",
      message: err.message,
    });
  }
};

const create = async (req, res) => {
  console.log("IM IN CREATE PA")
  const token = req.cookies["jwt"];
  if (!token) return res.status(403).send("You are not logged in.");
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!payload.role === "supplier")
      return res.status(403).send("You have to be a supplier.");
  } catch (error) {
    return res.status(403).send("Invalid token.");
  }

  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      success: false,
      err: "Bad request",
      message: "The request body is empty",
    });

  try {
    if (Array.isArray(req.body)) {
      console.log("IM IN line 94 PA")
      Product.insertMany(req.body, { ordered: false })
        .then(function (product) {
          res.status(200).json({
            success: true,
            data: product,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("IM IN line 106 PA")
      let product = new Product(req.body);
      product = await product.save();
      res.status(200).json({
        success: true,
        data: product,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      err: "Internal server error",
      message: err.message,
    });
  }
};

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
    product.productImages = product.productImages.map((imgId) => {
      return fs.readFileSync(
        `${__dirname}/../storage/productImages/${imgId}`,
        "base64"
      );
    });

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
  let productId = req.params.id;
  let update = req.body;
  Product.findByIdAndUpdate(productId, { $set: update }, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          message: "Product not found with id " + req.params.id,
        });
      }
      res.status(200).json({
        data: data,
        message: "Product successfully updated",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message: "Product not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating product with id " + req.params.id,
      });
    });
};

const remove = async (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          message: "Product not found with id " + req.params.id,
        });
      }
      res.status(200).json({
        data: data,
        message: "Product successfully deleted!",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete product with id " + req.params.id,
      });
    });
};

module.exports = { list, create, update, remove };
