<template>
  <div>这是hello的{{ active }}</div>
  <about-word></about-word>
  <div id="demo">
    <div
      @mousemove="xCoordinate"
      :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
      class="movearea"
    >
      <h3>Move your mouse across the screen...</h3>
      <p>x: {{ x }}</p>
    </div>
  </div>
</template>
<script>
import World from "@/components/World.vue";

export default {
  inject: ["active"],
  components: {
    "about-word": World,
  },
  data() {
    return {
      x: 0,
    };
  },
  methods: {
    xCoordinate(e) {
      this.x = e.clientX;
    },
  },
};
</script>
<style lang="scss" scoped>
#demo {
  width: 600px;
}
.movearea {
  height: 300px;
  transition: 0.2s background-color ease;
}
</style>
