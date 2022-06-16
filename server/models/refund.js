const mongoose = require("mongoose");

var refundSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId, ref: "order"
        },
        paymentId: {
            type: mongoose.Schema.Types.ObjectId, ref: "payment"
        },
        description: String,
        status: String,
    },
    {timestamps: true},
);

let refund = mongoose.model("refund", refundSchema);

module.exports = refund;