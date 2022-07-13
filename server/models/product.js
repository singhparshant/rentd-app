const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let productSchema = new Schema(
  {
    name: {
      type: String,
    },
    monthlyPrice: Number,
    discount: Number,
    deposit: Number,
    minDuration: Number,
    maxDuration: Number,
    description: String,
    supplierId: String,
    avgRating: Number,
    numberRatings: Number,
    category: {
      type: String,
      index: true,
    },
    productImages: [String],
  },
  { timestamps: true }
);

let Product = mongoose.model("product", productSchema);

module.exports = Product;
