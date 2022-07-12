const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category");

router.get("/", categoryController.list);

router.get("/:id", categoryController.read);

router.post("/", categoryController.create);


module.exports = router;
