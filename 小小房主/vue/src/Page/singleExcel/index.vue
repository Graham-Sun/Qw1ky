<template>
  <div id="singleExcel">
    <div class="header">
      <el-steps :active="active" simple finish-status="success">
        <el-step title="分析类型确定"></el-step>
        <el-step title="分数成绩导入"></el-step>
        <el-step title="报表类型选择"></el-step>
        <el-step title="报表参数设置"></el-step>
      </el-steps>
    </div>
    <div class="main">
      <AnalysisType ref="AnalysisType" v-if="this.active === 0" />
      <AnalysisGrade ref="AnalysisGrade" v-if="this.active === 1" />
      <AnalysisReport ref="AnalysisReport" v-if="this.active === 2" />
      <AnalysisSetting ref="AnalysisSetting" v-if="this.active === 3" />
    </div>
    <div class="footer">
      <el-button class="right" type="primary" @click="nextBtn">{{ this.active === 4 ? "完成" : "下一步" }}</el-button>
      <el-button @click="upBtn" class="this.active === 0 ? left red : left">
        {{ this.active === 0 ? "删除分析" : "上一步" }}</el-button>
    </div>
  </div>
</template>

<script>
  import AnalysisType from "./analysisType";
  import AnalysisGrade from "./analysisGrade";
  import AnalysisReport from "./analysisReport";
  import AnalysisSetting from "./analysisSetting";

  export default {
    name: "singleExcel",
    data() {
      return {
        active: 0,
        component: {
          0: "AnalysisType",
          1: "AnalysisGrade",
          2: "AnalysisReport",
          3: "AnalysisSetting",
        },
      }
    },
    components: {
      AnalysisType,
      AnalysisGrade,
      AnalysisReport,
      AnalysisSetting,
    },
    watch: {},
    methods: {
      nextBtn(e) {
        // 1 >
        // if (e) {
        //   if (this.active++ > 2) {
        //     this.active = 4
        //   }
        // } else {
        // this.$refs[this.component[this.active]].next()
        // }

        // 2 >
        let analysis = JSON.parse(sessionStorage.getItem("analysis"));
        analysis.step = this.active + 1
        sessionStorage.setItem("analysis", JSON.stringify(analysis));

        if (this.active === 4) {
          this.$router.push({ name: "ASingleAnalysis_analysisComplete" })
          return;
        }
        this.$bus.$off('next')
        // 我bus打开了---挂载了一个方法
        this.$bus.$on('next', (e) => {
          if (e === 'true') {
            if (this.active++ > 2) {
              this.active = 4
            }
          }
        })
        this.$refs[this.component[this.active]].next()

        // this.$bus.$emit('next', "true");
      },
      upBtn() {
        if (this.active-- < 2) {
          this.active = 0
        }
      }
    },
    mounted() {
      this.active = Number(JSON.parse(sessionStorage.getItem("analysis")).step)
    },
  }
</script>

<style lang="scss" scoped>
  .header,
  .main,
  .footer {
    margin-top: 20px;
    background: #fff;
    border-radius: 2px;
  }

  .header {
    width: 100%;
    box-sizing: border-box;
  }

  .main {
  }

  .footer {
    position: fixed;
    width: calc(100% - 240px);
    height: 43px;
    bottom: 43px;
    left: 240px;
    background: #fff;
    box-shadow: 0 -1px 4px 0 hsla(0, 0%, 72.5%, .5);
    z-index: 99;

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
      border-radius: 2px;
    }

    .red {
      background: #d54141;
      color: #fff;
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
</style>