<template>
  <div>counter:{{ counter }}</div>
  <div>doubleCounter:{{ doubleCounter }}</div>
  <el-button type="success" @click="main.counter++">main.counter++</el-button>
</template>

<script lang="ts" setup>
import { useMainStore } from './stores/main';
import { storeToRefs } from 'pinia';
const main = useMainStore();
const { counter, doubleCounter } = storeToRefs(main);
</script>

<style scoped></style>
