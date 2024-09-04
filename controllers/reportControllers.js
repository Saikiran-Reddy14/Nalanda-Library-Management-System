const borrowRecordModel = require("../models/borrowRecordModel");
const Book = require("../models/bookModel");

const getMostBorrowed = async (req, res) => {
  try {
    const mostBorrowed = await borrowRecordModel.aggregate([
      { $group: { _id: "$book", borrowCount: { $sum: 1 } } },
      { $sort: { borrowCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
    ]);
    res.json(mostBorrowed);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

const getActiveMembers = async (req, res) => {
  try {
    const activeMembers = await borrowRecordModel.aggregate([
      { $group: { _id: "$user", borrowCount: { $sum: 1 } } },
      { $sort: { borrowCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ]);
    res.json(activeMembers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

const getBookAvalability = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const borrowedBooks = await borrowRecordModel.countDocuments({
      return_date: null,
    });
    const availableBooks = totalBooks - borrowedBooks;

    res.json({ totalBooks, borrowedBooks, availableBooks });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

module.exports = { getMostBorrowed, getActiveMembers, getBookAvalability };
