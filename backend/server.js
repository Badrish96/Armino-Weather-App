const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const weatherRoutes = require("./weatherRoute");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URL = "mongodb://127.0.0.1:27017/weather";

app.use(cors());
app.use(express.json());
app.use("/api/weather", weatherRoutes);

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
