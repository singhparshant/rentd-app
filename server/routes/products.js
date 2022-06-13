const express = require("express");
const Product = require("../models/product");
const router = express.Router();


/**
 * @swagger
 * /products:
 *  get:
 *    description: get all products
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).res.status(400).json(err.message);
  }
});

function getProduct(name) {
  try{
    let products = await Product.getProduct({"name": name});
    return json(products);
  }
  catch (err){
    return res.status(400).json(err.message);
  }
}
function getAllProductsSupplier(supplierIdArg){
  try{
    let products = await Product.find({"supplierId": supplierIdArg});
    return json(products);
  }
  catch (err){
    return res.status(400).json(err.message);
  }
}

function productFilterPrice(min, max){
  try{
    let products = await Product.find({"monthlyPrice": {$gt: min, $lt: max}});
    return json(products);
  }
  catch (err){
    return res.status(400).json(err.message);
  }
}


/**
 * @swagger
 * /product:
 *    post:
 *      description: Add a new product
 *    requestBody:
 *      content: 
 *          application/json
 *        
 *    responses:
 *      '201':
 *        description: Successfully created user
 */
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
