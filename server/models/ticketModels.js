const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   score: { type: Number, required: true },
   description: { type: String, required: true },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
});

ticketSchema.pre("save", function (next) {
   this.updatedAt = Date.now();
   next();
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
