<template>
  <div>
    menu1
    <el-button @click="add">{{ $store.state.count }}</el-button>
  </div>
</template>

<script>
export default {
  name: "Menu1",
  data() {
    return {};
  },
  methods: {
    add() {
      this.$store.commit("increment");
    },
  },
  mounted() {},
};
</script>

<style></style>
