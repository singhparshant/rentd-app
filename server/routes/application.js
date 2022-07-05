const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/application");

router.get("/", applicationController.list);

router.get("/codeOfConduct", applicationController.getCodeOfConduct);

router.get("/:id", applicationController.read);

router.post("/", applicationController.create);

router.post("/updateStatus/:id", applicationController.updateStatus);



module.exports = router;
