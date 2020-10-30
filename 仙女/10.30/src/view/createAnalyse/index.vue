<template>
  <div id="createAnalyse">
    <el-steps :active="tableData.step" finish-status="success" simple>
      <el-step title="分析类型确定"></el-step>
      <el-step title="分数成绩导入"></el-step>
      <el-step title="报表类型选择"></el-step>
      <el-step title="报表参数设置"></el-step>
    </el-steps>
    <ASingleType ref="ASingleType" v-if="tableData.step === 0" />
    <ASingleGrade ref="ASingleGrade" v-if="tableData.step === 1" />
    <ASingleReport ref="ASingleReport" v-if="tableData.step === 2" />
    <ASingleParameter ref="ASingleParameter" v-if="tableData.step === 3" />
    <div class="footer">
      <el-button
        class="btnBack"
        v-show="tableData.step !== 0"
        @click="back"
        icon="el-icon-arrow-left"
        >上一页</el-button
      >
      <el-button class="btnNext" @click="next"
        >{{ tableData.step === 4 ? "完成" : "下一页"
        }}<i class="el-icon-arrow-right el-icon--right"></i
      ></el-button>
    </div>
  </div>
</template>

<script>
import ASingleType from "./aSingleType/index";
import ASingleGrade from "./aSingleGrade/index";
import ASingleReport from "./aSingleReport/index";
import ASingleParameter from "./aSingleParameter/index";
export default {
  name: "CreateAnalyse",
  data() {
    return {
      tableData: {
        step: 0,
      },
      ref: {
        0: "ASingleType",
        1: "ASingleGrade",
        2: "ASingleReport",
        3: "ASingleParameter",
      },
    };
  },
  components: {
    ASingleType,
    ASingleGrade,
    ASingleReport,
    ASingleParameter,
  },
  methods: {
    next() {
      if (this.tableData.step === 4) {
        this.$router.push({ name: "ASingleAnalysis_ASingleComplete" });
        return;
      }
      this.tableData.step = this.$refs[this.ref[this.tableData.step]].begin(
        this.tableData.step
      );
      let data =
        JSON.parse(sessionStorage.getItem("row")) ||
        JSON.parse(sessionStorage.getItem("createData"));
      data.step = this.tableData.step;
      sessionStorage.setItem("row", JSON.stringify(data)) ||
        sessionStorage.setItem("createData", JSON.stringify(data));
    },

    back() {
      if (this.tableData.step === 4) {s
        this.tableData.step -= 1;
        return;
      }
      this.tableData.step = this.$refs[this.ref[this.tableData.step]].backStep(
        this.tableData.step
      );
      let data =
        JSON.parse(sessionStorage.getItem("row")) ||
        JSON.parse(sessionStorage.getItem("createData"));
      data.step = this.tableData.step;
      sessionStorage.setItem("row", JSON.stringify(data)) ||
        sessionStorage.setItem("createData", JSON.stringify(data));
    },
  },
  mounted() {
    if (sessionStorage.getItem("row")) {
      let data = JSON.parse(sessionStorage.getItem("row"));
      this.tableData.step = Number(data.step);
    }
  },
};
</script>

<style lang="scss" scoped>
#createAnalyse {
  width: 100%;
  height: 100%;
  .header {
    background: #fff;
    height: 50px;
    .el-steps {
      width: 100%;
      height: 50px;
      line-height: 50px;
    }
  }
  .el-steps--simple {
    background: #fff !important;
    margin-bottom: 10px;
  }
  .footer {
    width: 100%;
    height: 80px;
    position: fixed;
    right: 0px;
    bottom: 60px;
    background: #fff;
    .btnBack {
      position: fixed;
      right: 170px;
      bottom: 80px;
      margin-top: 12px;
    }
    .btnNext {
      position: fixed;
      right: 50px;
      bottom: 80px;
      margin-top: 12px;
    }
  }
}
</style>

