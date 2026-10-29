<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <aside>
    <h2>Before update</h2>
    <button @click="count++">Count: {{ count }}</button>
  </aside>
</template>
