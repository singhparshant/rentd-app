const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.get("/", userController.list);

router.post("/", userController.create);

router.delete("/:id", userController.remove);

router.post("/login", userController.login);

router.get("/logout", userController.logout);

router.post("/test", userController.test);


module.exports = router;
