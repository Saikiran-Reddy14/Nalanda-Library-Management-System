const express = require("express");
const auth = require("../middleware/auth");
const {
  createBook,
  updateBook,
  getAllBooks,
  deleteBook,
} = require("../controllers/bookControllers");
const router = express.Router();

router.post("/", auth, createBook);
router.put("/:id", auth, updateBook);
router.delete("/:id", auth, deleteBook);
router.get("/", getAllBooks);

module.exports = router;
