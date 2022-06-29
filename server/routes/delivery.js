const express = require("express");
const router = express.Router();

const DeliveryController = require("../controllers/delivery")

router.get("/", DeliveryController.list);

router.post("/", DeliveryController.create);

router.get("/:id", DeliveryController.read);

router.put("/:id", DeliveryController.update);

router.delete("/:id", DeliveryController.remove);


module.exports = router;