const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let paymentSchema = new Schema(
  {
    senderID: {
        type: Schema.Types.ObjectId, ref: "user"
    },
    senderIBAN: String,
    recepientIBAN: String,
    amount:Number
  },
  { timestamps: true }
);

let payment = mongoose.model("payment", paymentSchema);

module.exports = payment;