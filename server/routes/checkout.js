const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const cors = require("cors");
const app = require("../app");

const PaymentsController = require("../controllers/payment");

router.post("/create-checkout-session", PaymentsController.create_session);
router.post("/refund", PaymentsController.refund);

module.exports = router;
