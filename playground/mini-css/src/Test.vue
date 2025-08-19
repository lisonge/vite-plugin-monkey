<template>
  <div class="flex dark:bg-red:10">counter:{{ counter }}</div>
  <div>doubleCounter:{{ doubleCounter }}</div>
  <el-button type="success" @click="main.counter++">main.counter++</el-button>
</template>
<style scoped>
.test {
  color: red;
}
</style>
