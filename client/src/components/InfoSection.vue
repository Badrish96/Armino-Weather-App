<template>
  <div class="bg-white p-4 rounded-lg shadow-md mt-4">
    <h2 class="text-xl font-bold">{{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    content: String,
  },
};
</script>
