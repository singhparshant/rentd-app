const mongoose = require("mongoose");

var refundSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
    orderItemId: String,
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payment",
    },
    description: {
      type: String,
      ref: "payment",
      required: false,
    },
  },
  { timestamps: true }
);

let refund = mongoose.model("refund", refundSchema);

module.exports = refund;
