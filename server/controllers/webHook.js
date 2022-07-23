const { getOrder, getLineItems } = require("./payment");
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const Order = require("../models/order");
const order = require("../models/order");
const Delivery = require("../models/delivery");
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
    console.log("OrderRequest: ", orderRequest);
    console.log("Event: ", event);

    //get the subscription list using customer id retrieved from the event
    const subscriptionList = await stripe.subscriptions.list({
      customer: event.data.customer,
    });

    //get the subscription items from the subscriptions list.
    // Each order creates a new customer in stripe and each order
    //  item has a subscription item inside the parent subscription object
    const orderItems_subId_mappping = [];
    subscriptionList.data[0].items.data.map((subItem) => {
      orderItems_subId_mappping.push({
        orderItemId: subItem.price.lookup_key,
        subId: subItem.id,
      });
    });

    //Create a delivery object
    const deliveryObject = new Delivery({
      status: "ordered",
      estimatedArrival: new Date(Date.now() + 60 * 60 * 24 * 3 * 1000),
    });

    //update orderitem object with new attributes like subscription id, delivery id and create a mongo order object
    orderRequest.orderItems = orderRequest.orderItems.map((orderItem) => {
      console.log("orderItem.product._id", orderItem.product._id);
      orderItem["status"] = "ordered";
      orderItem["productId"] = orderItem.product._id;
      orderItem["deliveryId"] = deliveryObject._id;
      orderItem["subscriptionId"] = orderItems_subId_mappping.find(
        (mapping) => mapping.orderItemId === orderItem._id
      ).subId;

      return orderItem;
    });
    const orderObject = new Order({
      customerId: orderRequest.customerId,
      orderItems: orderRequest.orderItems,
      paymentId: event.data.object.id,
      amount: event.data.object.amount,
    });

    //save in database
    try {
      console.log("orderobject to be saved: ", orderObject);
      await orderObject.save();
      await deliveryObject.save();
    } catch (error) {
      res.status(500);
    }
  }
  res.status(200).json({ received: true });
});

module.exports = { stripeWebhook };

// {
//   customerId: '62b46dce95b02b7c1b024ae9',
//   amount: 800,
//   orderItems: [ { product: [Object], quantity: 2, duration: 2 } ]
// }

// await stripe.subscriptions.list({customer:'cus_M6YOPHywTpKCB2'})
// response.data[0].items

//const deleted = await stripe.subscriptionItems.del("si_M6YOkyK1rEN9yk")
