<script setup lang="ts">
import { ref } from 'vue';
const count = ref(0);
</script>

<template>
  <div @click="count++">
    {{ count }}
  </div>
</template>

<style scoped>
div {
  font-size: 40px;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
