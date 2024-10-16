const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "userId is required field!"],
    },
    title: {
      type: String,
    },
    amount: {
      type: Number,
    },
    category: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  {
    versionKey: false,
  }
);

const expense = mongoose.model("expenses", expenseSchema);

module.exports = expense;
