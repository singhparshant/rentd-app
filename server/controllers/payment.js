const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
let orderData;

const createProductAndPrice = async (orderItems) => {
  let priceOneTime,
    priceRecurring,
    product,
    retVal = [];
  for (let i = 0; i < orderItems.length; i++) {
    let orderItem = orderItems[i];
    const item = orderItem.product;
    product = await stripe.products.create({
      name: item.name,
      // images: ["../storage/productImages/${item.productImages[0]}"],
    });
    console.log("Product id : ", product.id);

    try {
      priceRecurring = await stripe.prices.create({
        // description: `Duration of renting is ${orderItem.duration}`,
        // quantiy: orderItem.quantity,
        unit_amount: item.monthlyPrice * 100,
        currency: "eur",
        recurring: { interval: "month" },
        product: product.id,
        //we use lookup key to place orders
        lookup_key: (Math.random() + 1).toString(36).substring(7),
      });

      priceOneTime = await stripe.prices.create({
        // quantiy: orderItem.quantity,
        unit_amount: item.deposit * 100,
        currency: "eur",
        product: product.id,
        //we use lookup key to place orders
        lookup_key: (Math.random() + 1).toString(36).substring(7),
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
      description: `One-time deposit payment`,
      price: row.priceOneTime.id,
      quantity: row.item.quantity,
    };
  });
  const recurringPaymentsArray = retVal.map((row) => {
    return {
      description: `Duration of renting is ${row.item.duration}`,
      price: row.priceRecurring.id,
      quantity: row.item.quantity,
    };
  });
  return [...oneTimePaymentsArray, ...recurringPaymentsArray];
};

const create_session = async (req, res) => {
  const order = req.body;
  orderData = order;
  const lineItemsArray = await createProductAndPrice(order.orderItems);
  // console.log("lineItemsArray: ", lineItemsArray);

  try {
    // const refund = await stripe.refunds.create({
    //   payment_intent: "pi_3LLzVMF96hOfmKlJ0jJZl6yV",
    //   amount: 10,
    // });
    // console.log("Refunded Wuhoo !!", refund);
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      payment_method_types: ["card"],
      line_items: lineItemsArray,
      metadata: { customerId: order.customerId },
      mode: "subscription",
      success_url: "localhost:3000/successs",
      cancel_url: "localhost:3000/failure",
    });
    res.json({ url: session.url });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.messsage });
  }
};

function getOrder() {
  return orderData;
}

module.exports = { create_session, getOrder };
