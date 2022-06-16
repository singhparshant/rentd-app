const express = require("express");
const router = express.Router();

const shoppingCartController = require("../controllers/shoppingCart");


router.get("/", shoppingCartController.list);

router.post("/", shoppingCartController.create);

router.get("/:id", shoppingCartController.read);

router.post("/update/:id", shoppingCartController.update);

router.post("/delete/:id", shoppingCartController.remove);


module.exports = router;
