const mongoose = require("mongoose");
const Product = require("./product");
let Schema = mongoose.Schema;

let shoppingCartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: Number,
        rentalDuration: Number,
      },
    ],
  },
  { timestamps: true }
);

let ShoppingCart = mongoose.model("shoppingCart", shoppingCartSchema);

module.exports = ShoppingCart;
