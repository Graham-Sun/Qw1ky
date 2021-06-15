<template>
  <div class="home">
    <pre-rander
      data-id="33"
      msg="Welcome to Your Vue.js App"
      v-model="active"
      v-model:value="active2"
      class="abc"
      :published="false"
      @change-tab="change"
    />
    <div>{{ active2 }}</div>
    <!-- <component v-bind:is="active">{{ active }}</component> -->
    <button @click="showHello = !showHello">
      {{ !showHello ? "点击" : "隐藏" }}展示动画
    </button>
    <Hello v-if="showHello" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Hello from "@/components/Hello.vue";

export default {
  name: "Home",
  components: {
    "pre-rander": HelloWorld,
    Hello,
  },
  data() {
    return {
      active: "bigpander",
      active2: 2,
      showHello: false,
    };
  },
  methods: {
    change(val) {
      console.log(val);
    },
  },
  provide() {
    return {
      active: this.active,
    };
  },
  watch: {},
  created() {},
  computed: {},
};
</script>
<style lang="scss">
.abc {
  color: blue;
}
</style>
