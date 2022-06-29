const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/order")

router.get("/", OrderController.list);

router.post("/", OrderController.create);

router.get("/:id", OrderController.read);

router.put("/:id", OrderController.update);

router.delete("/:id", OrderController.remove);


module.exports = router;