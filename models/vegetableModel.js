const mongoose = require("mongoose");

const vegetableSchema = new mongoose.Schema(
  {
    name: { type: String },
    price: { type: Number },
    unitPerPrice: { type: Number },
    unit: { type: String },
    quantity: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

const Vegetable = mongoose.model("Vegetable", vegetableSchema);
module.exports = Vegetable;
