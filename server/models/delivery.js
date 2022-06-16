const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let deliverySchema = new Schema(
  {
    _orderID: {
        type: Schema.Types.ObjectId, ref: "user"
    },
    address: String,
    status: String,
    estimatedArrival: Date,
    arrivalDate:{
        type:Date,
        required:false
    } 
  },
  { timestamps: true }
);

let Delivery = mongoose.model("delivery", deliverySchema);

module.exports = Delivery;