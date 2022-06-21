const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    role: {
      type: String,
      index: true
    },
    email: {
      type: String,
    },
    username: {
      type: String
    },
    passwordHash: {
      type: String
    },
    address: {
      type: String
    },
    IBAN: {
      type: String,
    }
  },
  { timestamps: true }
);

let User = mongoose.model("user", userSchema);

module.exports = User;
