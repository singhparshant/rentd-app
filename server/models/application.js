const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let applicationSchema = new Schema(
  {
    supplierId: {
        type: Schema.Types.ObjectId, ref: "user"
    },
    codeOfConduct: {
        type: Buffer, 
        contentType: String
    },
    KYCdocs: [{
        type: Buffer, 
        contentType: String
    }],
    status: {
        type:String, 
        index:true
    }
  },
  { timestamps: true }
);

let application = mongoose.model("application", applicationSchema);

module.exports = application;