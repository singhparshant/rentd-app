const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let deliverySchema = new Schema(
  {
    _orderID: {
      type: Schema.Types.ObjectId,
      ref: "order",
    },
    address: {
      type: String,
      required: false,
    },
    status: String,
    estimatedArrival: {
      type: Date,
      required: false,
    },
    arrivalDate: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

let Delivery = mongoose.model("delivery", deliverySchema);

module.exports = Delivery;
