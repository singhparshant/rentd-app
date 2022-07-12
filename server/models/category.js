const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let categorySchema = new Schema(
    {
        name: String
    },
    { timestamps: true }
);

let category = mongoose.model("category", categorySchema);

module.exports = category;