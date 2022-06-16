const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let shoppingCartSchema = new Schema(
  {
    _user: {
      type: Schema.Types.ObjectId, ref: "user"
    },
    total: {
      type: Number,
    },
    products:
        [{
            productID:{
                type: Schema.Types.ObjectId, ref: "product"
            },
            quantity: Number
        }]
    
  },
  { _id:false, timestamps: true }
);

let ShoppingCart = mongoose.model("shoppingCart", shoppingCartSchema);

module.exports = ShoppingCart;