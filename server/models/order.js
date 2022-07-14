const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let orderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    quantity: Number,
    amount: Number,
    monthlyPrice: Number,
    duration: Number,
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    subId: String,
    paymentID: {
      type: Schema.Types.ObjectId,
      ref: "payment",
    },
    deliveryId: {
      type: Schema.Types.ObjectId,
      ref: "delivery",
    },
    status: String,
  },
  { timestamps: true }
);

let order = mongoose.model("order", orderSchema);

module.exports = order;
