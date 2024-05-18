// controllers/weatherController.js
const axios = require("axios");
const Weather = require("./weatherModel");
require("dotenv").config();

const API_KEY = "229717f4d25a7900161953072fb95302";

const getCurrentWeather = async (req, res) => {
  const { location } = req.query;
  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
    );
    const { temp } = response.data.main;
    const { description, icon } = response.data.weather[0];

    const weatherEntry = new Weather({
      location,
      date: new Date(),
      temperature: temp,
      description,
      icon,
    });

    await weatherEntry.save();

    res.json({ temperature: temp, description, icon });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

const getHourlyWeather = async (req, res) => {
  const { location } = req.query;
  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    // Step 1: Get coordinates for the location
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${API_KEY}`
    );

    if (geoResponse.data.length === 0) {
      return res.status(400).json({ error: "Invalid location" });
    }

    const { lat, lon } = geoResponse.data[0];

    // Step 2: Fetch weather data using One Call API
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${API_KEY}&units=metric`
    );

    if (!weatherResponse.data || !weatherResponse.data.hourly) {
      return res.status(500).json({ error: "No hourly data found" });
    }

    const hourlyData = weatherResponse.data.hourly.map((hour) => ({
      timestamp: hour.dt,
      temp: hour.temp,
      icon: hour.weather[0].icon,
    }));

    res.json(hourlyData);
  } catch (error) {
    console.error(
      "Error fetching hourly weather data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Failed to fetch hourly weather data" });
  }
};

const getHistoricalWeather = async (req, res) => {
  const { location, from, to } = req.query;
  const validLocations = [
    "Delhi",
    "Moscow",
    "Paris",
    "New York",
    "Sydney",
    "Riyadh",
  ];
  const maxDateRange = 30;

  if (!location || !from || !to) {
    return res
      .status(400)
      .json({ error: "Location, from, and to dates are required" });
  }

  if (!validLocations.includes(location)) {
    return res.status(400).json({ error: "Invalid location" });
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);
  const dateDiff = (toDate - fromDate) / (1000 * 60 * 60 * 24);

  if (dateDiff > maxDateRange) {
    return res
      .status(400)
      .json({ error: `Date range should not exceed ${maxDateRange} days` });
  }

  try {
    const data = await Weather.find({
      location,
      date: {
        $gte: fromDate,
        $lte: toDate,
      },
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch historical weather data" });
  }
};

module.exports = {
  getCurrentWeather,
  getHourlyWeather,
  getHistoricalWeather,
};
