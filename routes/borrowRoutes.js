const express = require("express");
const auth = require("../middleware/auth");
const {
  borrowBook,
  returnBook,
  getHistory,
} = require("../controllers/borrowControllers");
const router = express.Router();

router.post("/:bookId", borrowBook);

router.post("/return/:bookId", returnBook);

router.get("/history", getHistory);

module.exports = router;
