const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let applicationSchema = new Schema(
  {
    email: String,
    username: String,
    address: String,
    codeOfConduct: String,
    KYCDocs: [String],
    status: {
      type: String,
      index: true
    }
  },
  { timestamps: true }
);

let application = mongoose.model("application", applicationSchema);

module.exports = application;