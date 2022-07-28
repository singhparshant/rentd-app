const mongoose = require("mongoose");

var supplierSchema = new mongoose.Schema(
  {
    quantity: Number,
    duration: Number,
    paymentId: String,
    customerId: String,
    productId: String,
    supplierId: String,
  },
  { timestamps: true }
);

let suppliers = mongoose.model("suppliers", supplierSchema);

module.exports = suppliers;
