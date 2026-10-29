<script setup lang="ts">
import { defineStore } from 'pinia';
import { ElButton } from 'element-plus';
const useCounter = defineStore('counter', { state: () => ({ count: 0 }) });
const counter = useCounter();
</script>

<template>
  <aside class="monkey-playground">
    <h2 class="text-blue-600">Vue · Pinia · Element Plus · UnoCSS</h2>
    <p>修改标题和 scoped 样式，检查热更新与计数。</p>
    <ElButton @click="counter.count++">Count: {{ counter.count }}</ElButton>
  </aside>
</template>

<style scoped lang="scss">
$color: #173047;
p {
  color: $color;
}
</style>
