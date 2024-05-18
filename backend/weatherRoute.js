// routes/weatherRoutes.js
const express = require("express");
const router = express.Router();
const {
  getCurrentWeather,
  getHistoricalWeather,
  getHourlyWeather,
} = require("./weatherController");

// Route to get current weather data
router.get("/current", getCurrentWeather);

// Route to get historical weather data
router.get("/historical", getHistoricalWeather);

// Route to get hourly weather data
router.get("/hourly", getHourlyWeather);

module.exports = router;
