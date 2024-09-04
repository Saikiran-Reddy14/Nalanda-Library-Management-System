const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A book must have a title"],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "A book must have an author"],
    trim: true,
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
  publication_date: {
    type: Date,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  copies: {
    type: Number,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
