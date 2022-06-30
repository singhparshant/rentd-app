const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product");

router.get("/", ProductController.list);

router.post("/", ProductController.create);

router.put("/:id", ProductController.update);

router.delete("/:id", ProductController.remove);

module.exports = router;
