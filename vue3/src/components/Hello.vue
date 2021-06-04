<template>
  <div>这是hello的{{ active }}</div>
  <about-word></about-word>
</template>
<script>
import World from "@/components/World.vue";

export default {
  inject: ["active"],
  components: {
    "about-word": World,
  },
};
</script>
