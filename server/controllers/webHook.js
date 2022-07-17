const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const stripe = require("stripe");
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
  if (event.type === "payment_intent.succeeded")
    console.log("Event was successful: ", event.data.metadata.order);
  // Then define and call a method to handle the successful payment intent.
  // handlePaymentIntentSucceeded(paymentIntent);

  // Return a 200 response to acknowledge receipt of the event
  res.send(event);
});

module.exports = { stripeWebhook };
