const express = require("express");
const auth = require("../middleware/auth");
const {
  borrowBook,
  returnBook,
  getHistory,
} = require("../controllers/borrowControllers");
const router = express.Router();

router.post("/:bookId", auth, borrowBook);

router.post("/return/:bookId", auth, returnBook);

router.get("/history", auth, getHistory);

module.exports = router;
