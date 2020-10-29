<template>
  <div>分数成绩导入</div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "AnalysisImport",
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
      console.log("分数成绩导入");
    },
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
