const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.get("/", userController.list);

router.get("/logout", userController.logout);

router.get("/:id", userController.read);

router.post("/", userController.create);

router.delete("/:id", userController.remove);

router.post("/login", userController.login);

router.put("/update/:id", userController.update)




module.exports = router;
