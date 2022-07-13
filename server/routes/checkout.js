const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const cors = require("cors");
const app = require("../app");

const PaymentsController = require("../controllers/payment");

router.post("/create-checkout-session", PaymentsController.create_session);
// router.post("/", async (req, res) => {
//   console.log("in checkout");
//   let { amount, id } = req.body;
//   try {
//     const payment = await stripe.paymentIntents.create({
//       amount,
//       currency: "USD",
//       description: "Rentd Company",
//       payment_method: id,
//       confirm: true,
//     });

//     console.log("Payment", payment);
//     res.json({
//       message: "Payment, sucessful",
//       success: true,
//     });
//   } catch (error) {
//     console.log("Error", error);
//     res.json({
//       message: "Payment failed",
//       success: false,
//     });
//   }
// });

module.exports = router;
