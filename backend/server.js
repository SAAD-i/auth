const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const app = express();
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/authRoutes");

connectDB();
//JSON Data Parsing
//Without this we get undefined data on post request
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Authentication routes are registered here
app.use("/api/auth", userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port : ${port}`);
});
