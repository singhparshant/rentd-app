const Order = require("../models/order");
const Product = require("../models/product");
const Refund = require("../models/refund");
const Delivery = require("../models/delivery");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

let orderData;

const createProductAndPrice = async (orderItems) => {
  let priceOneTime,
    priceRecurring,
    stripeProduct,
    retVal = [];
  for (let i = 0; i < orderItems.length; i++) {
    let orderItem = orderItems[i];
    const item = orderItem.product;
    stripeProduct = await stripe.products.create({
      name: item.name,
      // images: [`../storage/productImages/${item.productImages[0]}`],
    });

    try {
      priceRecurring = await stripe.prices.create({
        // description: `Duration of renting is ${orderItem.duration}`,
        // quantiy: orderItem.quantity,
        unit_amount: item.monthlyPrice * (1 - 0.01 * item.discount) * 100,
        currency: "eur",
        recurring: { interval: "month" },
        product: stripeProduct.id,
        //we use lookup key to place orders
        lookup_key: `${orderItem._id}`,
      });

      priceOneTime = await stripe.prices.create({
        // quantiy: orderItem.quantity,
        unit_amount: item.deposit * 100,
        currency: "eur",
        product: stripeProduct.id,
        //we use lookup key to place orders
        lookup_key: `One-Time,${orderItem._id}`,
      });
    } catch (err) {
      console.error(err);
    }
    retVal.push({
      item: orderItem,
      priceOneTime,
      priceRecurring,
    });
  }
  const oneTimePaymentsArray = retVal.map((row) => {
    return {
      description: `One-time, ${row.item.product._id}`,
      price: row.priceOneTime.id,
      quantity: row.item.quantity,
    };
  });
  const recurringPaymentsArray = retVal.map((row) => {
    return {
      description: `Recurring payment, ${row.item.product._id}`,
      price: row.priceRecurring.id,
      quantity: row.item.quantity,
    };
  });
  return [...oneTimePaymentsArray, ...recurringPaymentsArray];
};

const create_session = async (req, res) => {
  const order = req.body;
  const lineItemsArray = await createProductAndPrice(order.orderItems);

  // Data requireds by the webhooks
  orderData = order;
  // lineItemsData = lineItemsArray;

  try {
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      payment_method_types: ["card"],
      line_items: lineItemsArray,
      metadata: { customerId: order.customerId },
      mode: "subscription",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/failure",
    });

    res.json({ url: session.url });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.messsage });
  }
};

const refund = async (req, res) => {
  const orderId = req.body.orderId.toString();
  const orderItemId = req.body.orderItemId.toString();

  //Find the order and corresponding relevent orderItem from the DB
  const order = await Order.findById(orderId);
  const orderItemfromDb = order.orderItems.find(
    (orderItem) => orderItem._id === orderItemId
  );

  //Get the product using product id to get the monthly price and deposit to refund
  const product = await Product.findById(orderItemfromDb.productId);

  //Get the delivery id to update the delivery item to return
  const deliveryId = await Delivery.findById(orderItemfromDb.deliveryId);

  //Get the customer subscriptions object from stripe.
  const subscriptionData = await stripe.subscriptions.list({
    customer: orderItemfromDb.stripeCustomerId,
  });

  // get the current number of active subscription items for a customer
  const currentNumberSubscriptions = subscriptionData.data[0]
    ? subscriptionData.data[0].items.data.length
    : 0;

  //Get the parent subscription id of the subscription items.
  const parentSubscriptionId = subscriptionData.data[0]
    ? subscriptionData.data[0].id
    : "";
  try {
    // cancel the recurring subscription
    // If there are multiple subscription items under a parent subscription, delete one item
    // If there is only one item, delete the whole parent subscription
    if (currentNumberSubscriptions > 1) {
      console.log(
        "Deleting subscription item: ",
        orderItemfromDb.subscriptionId
      );
      await stripe.subscriptionItems.del(orderItemfromDb.subscriptionId);
    } else if (currentNumberSubscriptions === 1) {
      console.log("Deleting parent subscription: ", parentSubscriptionId);
      await stripe.subscriptions.del(parentSubscriptionId);
    }

    // Do a refund of the amount equivalent to (one monthly price - discount) + Deposit
    const refund = await stripe.refunds.create({
      payment_intent: order.paymentId,
      amount:
        orderItemfromDb.quantity *
        (product.monthlyPrice * (1 - 0.01 * product.discount) +
          product.deposit) *
        100,
    });

    //Update the order status to refunded
    const updatedOrderItem = order.orderItems.map((orderItem) => {
      if (orderItem._id === orderItemId) orderItem.status = "refunded";
      return orderItem;
    });
    order.orderItems = updatedOrderItem;

    //Create the refund mongo object
    const refundObject = new Refund({
      orderID: orderId,
      orderItemId: orderItemId,
      description: req.body.description,
      paymentId: order.paymentId,
    });

    console.log("Refund obj: ", refundObject);
    //Save the update order, delivery items and create a new refund item
    await order.save();
    await refundObject.save();

    await res.status(200).send({
      message: "Succesfully processed refund and cancelled subscription",
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Could not cancel subscription/ process refund" });
  }
};

function getOrder() {
  return orderData;
}

module.exports = { create_session, refund, getOrder };
