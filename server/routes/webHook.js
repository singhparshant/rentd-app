const express = require("express");
const router = express.Router();
const stripeWebhookController = require("../controllers/webHook");

router.post(
  "/",
  express.raw({ type: "application/json" }),
  stripeWebhookController.stripeWebhook
);

module.exports = router;
