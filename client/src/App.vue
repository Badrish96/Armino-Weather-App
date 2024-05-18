<template>
  <div class="app-background">
    <div class="container mx-auto p-4">
      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/2 p-4">
          <input
            type="text"
            v-model="location"
            placeholder="Enter location"
            @keyup.enter="fetchWeatherData"
            class="w-full p-2 border rounded"
          />
          <button
            @click="fetchWeatherData"
            class="w-full mt-2 md:mt-0 md:w-auto md:ml-2 p-2 bg-blue-500 text-white rounded search-bar"
          >
            Search
          </button>
          <WeatherHeader
            v-if="currentWeather.temperature !== null"
            :temperature="currentWeather.temperature"
            :description="currentWeather.description"
            :location="currentWeather.location"
            :currentDate="currentWeather.currentDate"
            :feelsLike="currentWeather.feelsLike"
            :sunsetTime="currentWeather.sunsetTime"
            :weatherIconUrl="currentWeather.weatherIconUrl"
          />
        </div>
        <div class="w-full md:w-1/2 p-4">
          <HourlyForecast
            v-if="hourlyForecast.length"
            :hourlyForecast="hourlyForecast"
          />
          <InfoSection title="Random Text" content="Some random text here." />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import WeatherHeader from "./components/WeatherHeader.vue";
import HourlyForecast from "./components/HourlyForecast.vue";
import InfoSection from "./components/InfoSection.vue";

export default {
  components: {
    WeatherHeader,
    HourlyForecast,
    InfoSection,
  },
  data() {
    return {
      location: "Delhi", // Default location
      currentWeather: {
        temperature: null,
        description: "",
        location: "",
        currentDate: "",
        feelsLike: null,
        sunsetTime: "",
        weatherIconUrl: "",
      },
      hourlyForecast: [],
    };
  },
  methods: {
    async fetchWeatherData() {
      try {
        const currentWeatherResponse = await axios.get(
          `http://localhost:3000/api/weather/current?location=${this.location}`
        );
        const currentWeatherData = currentWeatherResponse.data;

        this.currentWeather = {
          temperature: currentWeatherData.temperature,
          description: currentWeatherData.description,
          location: this.location,
          currentDate: new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          feelsLike: currentWeatherData.temperature, // Assuming feels like temperature is same as temperature
          sunsetTime: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }), // Replace with actual sunset time
          weatherIconUrl: `https://openweathermap.org/img/wn/${currentWeatherData.icon}.png`,
        };

        const hourlyForecastResponse = await axios.get(
          `http://localhost:3000/api/weather/hourly?location=${this.location}`
        );
        this.hourlyForecast = hourlyForecastResponse.data.map((hour) => ({
          time: new Date(hour.timestamp * 1000).getHours() + ":00",
          temperature: hour.temp,
          iconUrl: `https://openweathermap.org/img/wn/${hour.icon}.png`,
        }));
      } catch (error) {
        console.error("Failed to fetch weather data", error);
      }
    },
  },
  mounted() {
    this.fetchWeatherData();
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.app-background {
  background-image: url("@/assets/weather-background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.search-bar {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 0px;
}

.bg-yellow-500 {
  background-color: #f59e0b;
}

.bg-gray-500 {
  background-color: #6b7280;
}

.bg-blue-700 {
  background-color: #1d4ed8;
}

.bg-purple-700 {
  background-color: #6d28d9;
}

.bg-gray-700 {
  background-color: #374151;
}

.bg-white {
  background-color: #ffffff;
  color: #000000;
}
</style>
