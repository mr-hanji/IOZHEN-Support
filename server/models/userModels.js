const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Counter } = require("./counterModels");

const userSchema = new Schema({
  userId: { type: Number },
  mobileNumber: { type: Number, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  nationalCode: { type: String },
  avatar: { type: String },
  role: {
    type: String,
    enum: ["user", "VIP", "admin", "superAdmin"],
    required: true,
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  const doc = this;
  if (!doc.userId) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "userId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    doc.userId = counter.sequence_value;
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
