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
    maxRentDuration: Number,
    images:    {
      type: Buffer, 
      contentType: String
    },
    description: String,
    supplierId: {
      type: Schema.Types.ObjectId, ref: "user"
    },
    avgRating: Number,
    numberRatings: Number,
    category: {
      type: String, 
      index: true
    }
  },
  { timestamps: true }
);

let Product = mongoose.model("product", productSchema);

module.exports = Product;