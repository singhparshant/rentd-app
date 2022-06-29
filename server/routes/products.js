const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product");

router.get("/", ProductController.list);

router.post("/", ProductController.create);

router.get("/:id", ProductController.read);

router.post("/update/:id", ProductController.update);

router.post("/delete/:id", ProductController.remove);

module.exports = router;
