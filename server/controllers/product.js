//import paginate from 'jw-paginate';

const fs = require("fs");
const jwt = require("jsonwebtoken");
const util = require("util");
const { v4: uuid } = require("uuid");
const Product = require("../models/product");

const list = async (req, res) => {
  try {
    // Server-side pagination logic
    var page = req.query.page || 1;
    var limit = parseInt(req.query.limit) || 6;
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
        {
          $or: [
            {
              name: req.query.searchString && {
                $regex: req.query.searchString,
                $options: "i",
              },
            },
            {
              description: req.query.searchString && {
                $regex: req.query.searchString,
                $options: "i",
              },
            },
          ],
        },
        {
          discount:
            req.query.hasDiscount === "true"
              ? {
                $gt: 0,
              }
              : undefined,
        },
        {
          supplierId: req.query.supplierId && {
            $eq: req.query.supplierId,
          }
        },
      ],
    };

    let sortObject = {};
    if (req.query.sortBy === "price") sortObject = { monthlyPrice: 1 };
    else if (req.query.sortBy === "name") sortObject = { name: 1 };

    let products = await Product.find(queryObject)
      .collation({ locale: "en" })
      .sort(sortObject)
      .skip(skipIndex)
      .limit(limit);

    let productCount = await Product.find(queryObject).count();
    let totalPages = Math.ceil(productCount / limit);

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
    const productImages = req.body.productImages;
    //store product images in storage/productImages
    const extenstions = productImages.map((imgContent) =>
      imgContent.substring(imgContent.indexOf("/") + 1, imgContent.indexOf(";"))
    );
    let fileNames = productImages.map(
      (_, idx) => uuid() + "." + extenstions[idx]
    );

    //prune input
    for (let i = 0; i < productImages.length; i++) {
      const regex = new RegExp(`^data:image\/${extenstions[i]};base64,`);
      productImages[i] = productImages[i].replace(regex, "");
    }
    productImages.map((imgContent, idx) => {
      fs.writeFile(
        `${__dirname}/../storage/productImages/${fileNames[idx]}`,
        imgContent,
        "base64",
        function (err) {
          console.log(err);
        }
      );
    });
    req.body.productImages = fileNames;
    let product = new Product(req.body);
    product = await product.save();
    res.status(200).json({
      success: true,
      data: product,
    });
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
  let updatedProduct = req.body;
  Product.findByIdAndUpdate(productId, { $set: updatedProduct }, { new: true })
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

const updateRating = async (req, res) => {
  try {
    console.log("body", req.body);
    const { productId, rating } = req.body;
    const product = await Product.findById(productId);
    const numberRatings = product.numberRatings || 0;
    const avgRating = product.avgRating || 0;
    product.avgRating =
      (avgRating * numberRatings + rating) / (numberRatings + 1);
    product.numberRatings = numberRatings + 1;
    product.save();
    res.status(200).send({ message: "rating updated" });
  } catch (error) {
    res.status(500).send({ message: "could not update rating" });
  }
};

module.exports = { list, create, update, remove, read, updateRating };
