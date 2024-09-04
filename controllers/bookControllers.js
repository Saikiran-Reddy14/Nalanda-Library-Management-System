const Book = require("../models/bookModel");

const createBook = async (req, res) => {
  try {
    if (req.user.role !== "Admin")
      return res.status(403).json({ message: "Access denied" });

    const { title, author, ISBN, publication_date, genre, copies } = req.body;
    const book = new Book({
      title,
      author,
      ISBN,
      publication_date,
      genre,
      copies,
    });
    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

const updateBook = async (req, res) => {
  try {
    if (req.user.role !== "Admin")
      return res.status(403).json({ message: "Access denied" });

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBook);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

const deleteBook = async (req, res) => {
  try {
    if (req.user.role !== "Admin")
      return res.status(403).json({ message: "Access denied" });

    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).skip(0).limit(100);
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};
module.exports = { createBook, updateBook, getAllBooks, deleteBook };
