<template>
  <div id="app">
    <!-- 显示最外层的router -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>