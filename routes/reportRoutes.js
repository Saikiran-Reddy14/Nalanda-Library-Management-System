const express = require("express");
const auth = require("../middleware/auth");
const {
  getMostBorrowed,
  getActiveMembers,
  getBookAvalability,
} = require("../controllers/reportControllers");
const router = express.Router();

router.get("/most-borrowed", auth, getMostBorrowed);

router.get("/active-members", auth, getActiveMembers);

router.get("/book-availability", auth, getBookAvalability);

module.exports = router;
