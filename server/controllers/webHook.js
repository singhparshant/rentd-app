const { getOrder } = require("./payment");
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const stripe = require("stripe");
const Order = require("../models/order");
const signingSecret = process.env.STRIPE_SIGNING_SECRET;

const stripeWebhook = asyncHandler(async (req, res) => {
  let event = req.body;
  if (signingSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        signingSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  }
  // Handle the event
  if (event.type === "payment_intent.succeeded") {
    const orderRequest = getOrder();
    orderRequest.orderItems.map((orderItem) => {
      orderItem["status"] = "ordered";
      orderItem["deliveryId"] = (Math.random() + 1).toString(36).substring(7);
      orderItem["product"] = orderItem.product.productId;
    });
    const order = new Order();
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send(event);
});

module.exports = { stripeWebhook };

// {
//   customerId: '62b46dce95b02b7c1b024ae9',
//   amount: 800,
//   orderItems: [ { product: [Object], quantity: 2, duration: 2 } ]
// }
