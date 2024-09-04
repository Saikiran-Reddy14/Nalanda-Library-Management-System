const Book = require("../models/bookModel");
const borrowRecordModel = require("../models/borrowRecordModel");

const borrowBook = async (req, res) => {
  try {
    if (req.user.role !== "Member")
      return res.status(403).json({ message: "Access denied" });

    const book = await Book.findById(req.params.bookId);
    if (!book || book.copies <= 0)
      return res.status(400).json({ message: "Book not available" });

    const borrowRecord = new borrowRecordModel({
      user: req.user._id,
      book: book._id,
    });
    await borrowRecord.save();

    book.copies -= 1;
    await book.save();

    res.json(borrowRecord);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

const returnBook = async (req, res) => {
  try {
    if (req.user.role !== "Member")
      return res.status(403).json({ message: "Access denied" });

    const borrowRecord = await borrowRecordModel.findOne({
      user: req.user._id,
      book: req.params.bookId,
      return_date: null,
    });
    if (!borrowRecord)
      return res
        .status(400)
        .json({ message: "No such borrowing record found" });

    borrowRecord.return_date = new Date();
    await borrowRecord.save();

    const book = await Book.findById(req.params.bookId);
    book.copies += 1;
    await book.save();

    res.json(borrowRecord);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

const getHistory = async (req, res) => {
  try {
    if (req.user.role !== "Member")
      return res.status(403).json({ message: "Access denied" });

    const history = await borrowRecordModel
      .find({ user: req.user._id })
      .populate("book");
    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};
module.exports = { borrowBook, returnBook, getHistory };
