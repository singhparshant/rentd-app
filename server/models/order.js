const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let orderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    paymentId: String,
    orderItems: [
      {
        _id: String,
        productId: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: Number,
        duration: Number,
        status: String,
        subscriptionId: String,
        deliveryId: {
          type: Schema.Types.ObjectId,
          ref: "delivery",
        },
      },
    ],
  },
  { timestamps: true }
);

let order = mongoose.model("order", orderSchema);

module.exports = order;
