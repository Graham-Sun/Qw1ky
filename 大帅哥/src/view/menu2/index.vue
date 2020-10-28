<template>
  <div>
    menu2
    {{ count }}
    <el-button @click="addCount">添加</el-button>
    <el-button @click="reduceCount">减少</el-button>
  </div>
</template>

<script>
export default {
  name: "Menu2",
  data() {
    return {
      count: 0,
    };
  },
  computed: {},
  methods: {
    addCount() {

    },
    reduceCount() {},
  },
  mounted() {},
};
</script>

<style></style>
