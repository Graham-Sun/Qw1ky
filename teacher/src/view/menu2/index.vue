<template>
  <div>
    menu2
    {{ count }}
    <el-button @click="addCount">添加</el-button>
    <el-button @click="reduceCount">减少</el-button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Menu2",
  data() {
    return {};
  },
  computed: {
    ...mapState("menu2", {
      count: (state) => state.count,
    }),
  },
  methods: {
    ...mapActions("menu2", ["addCount", "reduceCount"]),
  },
  mounted() {},
};
</script>

<style></style>
