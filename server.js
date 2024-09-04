const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const borrowRoutes = require("./routes/borrowRoutes");
const statsRoutes = require("./routes/reportRoutes");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/borrow", borrowRoutes);
app.use("/stats", statsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
