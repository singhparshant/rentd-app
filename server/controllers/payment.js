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

const createProductAndPrice = async (item) => {
  let priceRecurring, product, priceOneTime;
  try {
    product = await stripe.products.create({
      name: item._id,
    });
  } catch (err) {
    console.error(err);
  }

  try {
    priceRecurring = await stripe.prices.create({
      unit_amount: item.monthlyPrice * 100,
      currency: "eur",
      recurring: { interval: "month" },
      product: product.id,
      //we use lookup key to place orders
      lookup_key: (Math.random() + 1).toString(36).substring(7),
    });

    priceOneTime = await stripe.prices.create({
      unit_amount: item.deposit * 100,
      currency: "eur",
      product: product.id,
      //we use lookup key to place orders
      lookup_key: (Math.random() + 1).toString(36).substring(7),
    });
  } catch (err) {
    console.error(err);
  }
  return [priceOneTime, priceRecurring];
};

const create_session = async (req, res) => {
  const item = req.body.product;
  const [priceOneTime, priceRecurring] = await createProductAndPrice(item);
  console.log(item);
  try {
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      line_items: [
        // {
        //   name: item.name,
        //   // images: `data:image/jpeg;base64,${item.productImages[0]}`,
        //   description: `Duration of renting is ${req.body.duration}`,
        //   price: priceRecurring.id,
        //   quantity: 1,
        //   amount: item.monthlyPrice,
        // },
        {
          name: item.name,
          images: ["../storage/productImages/bike1_1.jpeg"], //`data:image/jpeg;base64,${item.productImages[0]}`,
          description: `Duration of renting is ${req.body.duration}`,
          // price: priceOneTime.id,
          quantity: req.body.quantity,
          amount: item.monthlyPrice,
        },
      ],
      line_items: [
        { price: priceOneTime.id, quantity: 1 },
        { price: priceRecurring.id, quantity: 1 },
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
