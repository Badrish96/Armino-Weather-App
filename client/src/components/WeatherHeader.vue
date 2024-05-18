<template>
  <div :class="bgColor" class="text-white p-4 rounded-lg shadow-md">
    <div class="flex items-center flex-col md:flex-row">
      <img
        :src="weatherIconUrl"
        alt="Weather Icon"
        class="w-16 h-16 md:mr-4 mb-4 md:mb-0"
      />
      <div class="text-center md:text-left">
        <div class="text-4xl">{{ temperature }}°C</div>
        <div class="text-xl capitalize">{{ description }}</div>
      </div>
    </div>
    <div class="mt-2 text-lg text-center md:text-left">{{ location }}</div>
    <div class="text-sm text-center md:text-left">{{ currentDate }}</div>
    <div class="mt-2 text-sm text-center md:text-left">
      <span>Feels like {{ feelsLike }}°C | Sunset {{ sunsetTime }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    temperature: Number,
    description: String,
    location: String,
    currentDate: String,
    feelsLike: Number,
    sunsetTime: String,
    weatherIconUrl: String,
  },
  computed: {
    bgColor() {
      switch (this.description.toLowerCase()) {
        case "clear sky":
        case "sunny":
          return "bg-yellow-500";
        case "few clouds":
        case "scattered clouds":
        case "broken clouds":
          return "bg-gray-500";
        case "shower rain":
        case "rain":
        case "light rain":
          return "bg-blue-700";
        case "thunderstorm":
          return "bg-purple-700";
        case "snow":
          return "bg-white text-black";
        case "mist":
        case "smoke":
        case "haze":
        case "dust":
        case "fog":
        case "sand":
        case "ash":
        case "squall":
        case "tornado":
          return "bg-gray-700";
        default:
          return "bg-blue-500"; // default color
      }
    },
  },
};
</script>
