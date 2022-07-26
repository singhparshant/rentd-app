const mongoose = require("mongoose");

var refundSchema = new mongoose.Schema(
  {
    orderId: String,
    orderItemId: String,
    paymentId: String,
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

let refund = mongoose.model("refund", refundSchema);

module.exports = refund;
