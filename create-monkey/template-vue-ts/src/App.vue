<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import viteLogoUrl from './assets/vite.svg';
import vueLogoUrl from './assets/vue.svg';
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img :src="viteLogoUrl" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img :src="vueLogoUrl" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
