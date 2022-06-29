const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let orderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    amount: Number,
    monthlyPrice: Number,
    orderItems: [
      {
        productID: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: Number,
        rentalDuration: Number,
      },
    ],
    paymentMethod: String,
    paymentID: {
      type: Schema.Types.ObjectId,
      ref: "payment",
    },
    deliveryID: {
      type: Schema.Types.ObjectId,
      ref: "delivery",
    },
    status: String,
  },
  { timestamps: true }
);

let order = mongoose.model("order", orderSchema);

module.exports = order;
