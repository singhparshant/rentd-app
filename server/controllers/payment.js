const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
// console.log(stripe);
const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React" }],
  [2, { priceInCents: 10000, name: "Learn React 2" }],
]);
const arr = [
  { id: 1, quantity: 3 },
  { id: 2, quantity: 1 },
];

const createProductAndPrice = async () => {
  let priceRecurring, product, priceOneTime;
  try {
    product = await stripe.products.create({
      name: "newProduct",
    });
  } catch (err) {
    console.error(err);
  }

  try {
    priceRecurring = await stripe.prices.create({
      unit_amount: 100 * 100,
      currency: "eur",
      recurring: { interval: "month" },
      product: product.id,
      //we use lookup key to place orders
      lookup_key: (Math.random() + 1).toString(36).substring(7),
    });

    priceOneTime = await stripe.prices.create({
      unit_amount: 400 * 100,
      currency: "eur",
      product: product.id,
      //we use lookup key to place orders
      lookup_key: (Math.random() + 1).toString(36).substring(7),
    });
  } catch (err) {
    console.error(err);
  }
  console.log("priceOneTime: ", priceOneTime);
  return [priceOneTime, priceRecurring];
};

const create_session = async (req, res) => {
  //   console.log("Inside function", req.body);
  const [priceOneTime, priceRecurring] = await createProductAndPrice();
  try {
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      line_items: [
        {
          price: priceOneTime.id,
          quantity: 1,
        },
        {
          price: priceRecurring.id,
          quantity: 1,
        },
      ],
      //   metadata: { basket_id: req.body.lookup_key },
      mode: "subscription",
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    });
    res.json({ url: session.url });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.messsage });
  }
};

module.exports = { create_session };
