<template>
  <div class="home">
    <pre-rander msg="Welcome to Your Vue.js App" v-model:id="active" class="abc"/>
    <div>{{ active }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    'pre-rander': HelloWorld,
  },
  data() {
    return {
      active: 1,
    };
  },
  methods: {},
  watch: {},
};
</script>
<style lang="scss">
.abc {
  color: blue;
}
</style>