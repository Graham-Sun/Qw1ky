<template>
  <div>报表类型选择</div>
</template>

<script>
import { mapMutations } from "vuex";
import { getReport } from "@/api/api.js";
export default {
  name: "AnalysisReport",
  // 接受父组件传来的参数
  props: {},
  data() {
    return {
      tableList: [],
    };
  },

  methods: {
    ...mapMutations("analysis", {
      next: "next",
    }),
    begin() {
      this.submit();
    },
    submit() {
      this.next(1);
    },
    getReport() {
      getReport().then((res) => {
        this.tableList = res.list;
      });
    },
  },
  mounted() {
    this.getReport();
  },
};
</script>

<style lang="scss"></style>
