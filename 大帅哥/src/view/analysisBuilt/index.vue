<template>
  <div id="analysisBuilt">
    <el-steps :active="analysis.step" finish-status="success" simple>
      <el-step title="分析类型确定"></el-step>
      <el-step title="分数成绩导入"></el-step>
      <el-step title="报表类型选择"></el-step>
      <el-step title="报表参数设置"></el-step>
    </el-steps>
    <AnalysisType ref="AnalysisType" v-if="analysis.step === 0" />
    <AnalysisImport ref="AnalysisImport" v-if="analysis.step === 1" />
    <AnalysisReport ref="AnalysisReport" v-if="analysis.step === 2" />
    <AnalysisSetting ref="AnalysisSetting" v-if="analysis.step === 3" />
    <div class="footer" :style="{ bottom: `${bottom}px` }">
      <el-button class="right" @click="nextComponent">
        {{ analysis.step === 3 ? "完成" : "下一步" }}
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
import AnalysisType from "./analysisType";
// 分数成绩导入
import AnalysisImport from "./analysisImport";
// 报表类型选择
import AnalysisReport from "./analysisReport";
// 报表参数设置
import AnalysisSetting from "./analysisSetting";
import { mapState, mapMutations } from "vuex";
export default {
  name: "AnalysisBuilt",
  data() {
    return {
      component: {
        0: "AnalysisType",
        1: "AnalysisImport",
        2: "AnalysisReport",
        3: "AnalysisSetting",
      },
      bottom: 43,
    };
  },
  components: {
    AnalysisType,
    AnalysisImport,
    AnalysisReport,
    AnalysisSetting,
  },
  watch: {},
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
      console.log(123456)
      this.$refs[this.component[this.analysis.step]].begin();
    },
    // 监听滚动条是否到达底部
    watchSchool() {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      this.bottom =
        43 > scrollHeight - (scrollTop + windowHeight)
          ? 43 - (scrollHeight - (scrollTop + windowHeight))
          : 0;
    },
  },
  mounted() {
    this.watchSchool();
    window.onscroll = () => {
      this.watchSchool();
    };
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
