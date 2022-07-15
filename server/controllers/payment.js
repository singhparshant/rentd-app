const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const createProductAndPrice = async (orderItems) => {
  let priceOneTime, priceRecurring;
  const retVal = await Promise.all(
    orderItems.map(async (orderItem) => {
      const item = orderItem.product;
      try {
        product = await stripe.products.create({
          name: item._id,
        });
      } catch (err) {
        console.error(err);
      }

      try {
        priceRecurring = await Promise.all(
          stripe.prices.create({
            description: `Duration of renting is ${row.item.duration}`,
            quantiy: orderItem.quantity,
            unit_amount: orderItem.duration * item.monthlyPrice * 100,
            currency: "eur",
            recurring: { interval: "month" },
            product: product.id,
            //we use lookup key to place orders
            lookup_key: (Math.random() + 1).toString(36).substring(7),
            product_data: {
              name: item.product.name,
              images: ["../storage/productImages/bike1_1.jpeg"],
            },
          })
        );

        priceOneTime = await Promise.all(
          stripe.prices.create({
            quantiy: orderItem.quantity,
            unit_amount: item.deposit * 100,
            currency: "eur",
            product: product.id,
            //we use lookup key to place orders
            lookup_key: (Math.random() + 1).toString(36).substring(7),
            product_data: {
              name: item.product.name,
              images: [
                "../storage/productImages/${item.product.productImages[0]}",
              ],
            },
          })
        );
      } catch (err) {
        console.error(err);
      }
      return {
        item: orderItem,
        priceOneTime: priceOneTime,
        priceRecurring: priceRecurring,
      };
    })
  );
  console.log("CCC: ", retVal);
  // console.log();
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
  const lineItemsArray = await createProductAndPrice(order.orderItems);
  console.log("lineItemsArray: ", lineItemsArray);

  // try {
  //   const session = await stripe.checkout.sessions.create({
  //     billing_address_collection: "auto",
  //     line_items: lineItemsArray,
  //     // line_items: [
  //     //   { price: priceOneTime.id, quantity: 1 },
  //     //   { price: priceRecurring.id, quantity: 1 },
  //     // ],
  //     // metadata: { basket_id: req.body.lookup_key },
  //     mode: "subscription",
  //     success_url: "https://example.com/success",
  //     cancel_url: "https://example.com/cancel",
  //   });
  //   res.json({ url: session.url });
  // } catch (e) {
  //   console.log(e);
  //   res.status(500).json({ error: e.messsage });
  // }
};

module.exports = { create_session };
