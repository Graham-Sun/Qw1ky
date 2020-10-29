<template>
  <div>报表参数设置</div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "AnalysisSetting",
  // 接受父组件传来的参数
  props: {},
  data() {
    return {};
  },

  methods: {
    ...mapMutations("analysis", {
      next: "next",
    }),
    begin() {
      this.ale();
    },
    ale() {
      this.next(1);
      console.log("报表参数设置");
    },
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
