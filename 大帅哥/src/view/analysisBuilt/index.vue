<template>
  <div id="analysisBuilt">
    <el-steps
      :active="active"
      finish-status="success"
      simple
      style="margin-top: 20px"
    >
      <el-step title="分析类型确定"></el-step>
      <el-step title="分数成绩导入"></el-step>
      <el-step title="报表类型选择"></el-step>
      <el-step title="报表参数设置"></el-step>
    </el-steps>
    <AnalysisType v-if="active === 0" />
    <AnalysisImport v-if="active === 1" />
    <AnalysisReport v-if="active === 2" />
    <AnalysisSetting v-if="active === 3" />
    <div class="footer">
      <el-button class="right" @click="next">
        {{ active === 4 ? "完成" : "下一步" }}
        <i class="el-icon-arrow-right el-icon--right"></i>
      </el-button>
      <el-button
        @click="back"
        class="left"
        icon="el-icon-arrow-left"
        v-show="active !== 0"
        >上一步</el-button
      >
    </div>
  </div>
</template>

<script>
// 分析类型确定
import AnalysisType from "./analysisType";
// 分数成绩导入
import AnalysisImport from "./analysisImport";
// 报表类型选择
import AnalysisReport from "./analysisReport";
// 报表参数设置
import AnalysisSetting from "./analysisSetting";
export default {
  name: "AnalysisBuilt",
  data() {
    return {
      active: 0,
    };
  },
  components: {
    AnalysisType,
    AnalysisImport,
    AnalysisReport,
    AnalysisSetting,
  },
  methods: {
    next() {
      this.active += 1;
    },
    back() {
      this.active -= 1;
    },
  },
};
</script>

<style lang="scss">
#analysisBuilt {
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
