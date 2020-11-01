<template>
  <div id="newaAnalysis">
    <el-steps
      :active="analysis.step"
      finish-status="success"
      simple
      style="margin-top: 20px"
    >
      <el-step title="分析类型确定"></el-step>
      <el-step title="分数成绩导入"></el-step>
      <el-step title="报表类型选择"></el-step>
      <el-step title="报表参数设置"></el-step>
    </el-steps>
    <NewaAnalysis1 ref="NewaAnalysis1" v-if="analysis.step === 0" />
    <NewaAnalysis2 ref="NewaAnalysis2" v-if="analysis.step === 1" />
    <NewaAnalysis3 ref="NewaAnalysis3" v-if="analysis.step === 2" />
    <NewaAnalysis4 ref="NewaAnalysis4" v-if="analysis.step === 3" />
    <div class="footer">
      <el-button class="right" @click="nextComponent">
        {{ analysis.step === 4 ? "完成" : "下一步" }}
        <i class="el-icon-arrow-right el-icon--right"></i>
      </el-button>
      <el-button
        @click="back(-1)"
        class="left"
        icon="el-icon-arrow-left"
        v-show="analysis.step !== 0"
        >上一步</el-button
      >
    </div>
  </div>
</template>

<script>
// 分析类型确定
import NewaAnalysis1 from "./newaAnalysis1";
// 分数成绩导入
import NewaAnalysis2 from "./newaAnalysis2";
// 报表类型选择
import NewaAnalysis3 from "./newaAnalysis3";
// 报表参数设置
import NewaAnalysis4 from "./newaAnalysis4";

import { mapState, mapMutations } from "vuex";
export default {
  name: "AnalysisBuilt",
  data() {
    return {
      component: {
        0: "NewaAnalysis1",
        1: "NewaAnalysis2",
        2: "NewaAnalysis3",
        3: "NewaAnalysis4",
      },
    };
  },
  components: {
    NewaAnalysis1,
    NewaAnalysis2,   
    NewaAnalysis3,
    NewaAnalysis4,
  },
  computed: {
    ...mapState("analysis", {
      analysis: "analysis",
    }),
  },
  methods: {
    ...mapMutations("analysis", {
      back: "back",
    }),
    nextComponent() {
      this.$refs[this.component[this.analysis.step]].begin();
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
#newaAnalysis {
  width: 100%;
  height: 90%;
  position: relative;
  .el-steps--simple {
    background: #fff;
    .el-step__title.is-process {
      font-weight: 400;
    }
  }

  .footer {
    background: #fff;
    position: fixed;
    width: calc(100% - 240px);
    bottom: 43px;
    height: 43px;
    left: 240px;
    .right,
    .left {
      margin-top: 6px;
      float: right;
      height: 30px;
      border-radius: 0px;
      line-height: 30px;
      padding: 0px;
      width: 98px;
      text-align: center;
    }
    .left {
      margin: 6px 20px;
    }
    .right {
      margin-right: 20px;
      background: linear-gradient(270deg, #17c7bb, #0fbc77);
      border-color: #17c7bb;
      color: #fff;
    }
  }
}
</style>
