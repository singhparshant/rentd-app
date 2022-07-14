const express = require("express");
const router = express.Router();

const shoppingCartController = require("../controllers/shoppingCart");


router.get("/", shoppingCartController.list);

router.post("/", shoppingCartController.create);

router.get("/:id", shoppingCartController.read);

router.put("/", shoppingCartController.update);

router.delete("/:id", shoppingCartController.remove);


module.exports = router;
