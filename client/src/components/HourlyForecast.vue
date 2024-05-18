<template>
  <div class="bg-gray-100 p-4 rounded-lg shadow-md mt-4">
    <div class="grid grid-cols-5 gap-2">
      <div
        v-for="(forecast, index) in hourlyForecast"
        :key="index"
        class="text-center"
      >
        <div>{{ forecast.time }}</div>
        <img :src="forecast.iconUrl" alt="Icon" class="w-8 h-8 mx-auto" />
        <div>{{ forecast.temperature }}°C</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hourlyForecast: Array,
  },
};
</script>
