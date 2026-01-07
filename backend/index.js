const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const authRouter = require("./router/authRoutes");
const urlRouter = require("./router/urlRoutes");
const shortUrlRouter = require("./router/shortUrlRoutes");
const cors = require("cors");

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use("/", shortUrlRouter);
app.use("/api/auth", authRouter);
app.use("/api/url", urlRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});