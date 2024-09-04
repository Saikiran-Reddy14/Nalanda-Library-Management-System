const mongoose = require("mongoose");

const borrowRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  borrow_date: { type: Date, default: Date.now },
  return_date: { type: Date },
});

const borrowRecord = mongoose.model("BorrowRecord", borrowRecordSchema);

module.exports = borrowRecord;
