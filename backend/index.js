const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const authRouter = require("./router/authRoutes");

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use("/api/auth", authRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});