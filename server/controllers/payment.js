const Order = require("../models/order");
const Product = require("../models/product");
const Refund = require("../models/refund");

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
    console.log("Product id : ", stripeProduct.id);

    try {
      priceRecurring = await stripe.prices.create({
        // description: `Duration of renting is ${orderItem.duration}`,
        // quantiy: orderItem.quantity,
        unit_amount: item.monthlyPrice * 100,
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
      priceOneTime: priceOneTime,
      priceRecurring: priceRecurring,
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

  const order = await Order.findById(orderId);
  const orderItemfromDb = order.orderItems.find(
    (orderItem) => orderItem._id === orderItemId
  );

  //Get the product using product id to get the monthly price and deposit to refund
  const product = await Product.findById(orderItemfromDb.productId);

  //Get the delivery id to update the delivery item to return
  const deliveryId = await Product.findById(orderItemfromDb.deliveryId);

  try {
    // cancel the recurring subscription
    const cancelSub = await stripe.subscriptionItems.del(
      orderItemfromDb.subscriptionId
    );

    //Do a refund of the amount equivalent to one monthly price + Deposit
    console.log(" product :  ", orderItemfromDb);
    const refund = await stripe.refunds.create({
      payment_intent: order.paymentId,
      amount: (product.monthlyPrice + product.deposit) * 100,
    });

    //Update the order status to refunded
    const updatedOrderItem = order.orderItems.map((orderItem) => {
      if (orderItem._id === orderItemId) orderItem.status = "refunded";
      return orderItem;
    });
    order.orderItems = updatedOrderItem;

    const refundObject = new Refund({
      orderID: orderId,
      orderItemId: orderItemId,
      description: req.body.description,
      paymentId: order.paymentId,
    });

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
