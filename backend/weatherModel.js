// models/Weather.js
const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

const Weather = mongoose.model("Weather", weatherSchema);

module.exports = Weather;
