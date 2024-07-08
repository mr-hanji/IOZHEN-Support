const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 0 },
});

exports.Counter = mongoose.model("Counter", counterSchema);

const ProductCounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 0 },
});

exports.ProductCounter = mongoose.model("ProductCounter", ProductCounterSchema);
