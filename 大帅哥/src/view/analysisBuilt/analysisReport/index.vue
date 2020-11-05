<template>
  <div id="analysisReport" v-loading="loading">
    <div class="head">
      <div class="top">
        报表类型：
        <el-radio-group v-model="radioType" size="mini" @change="filterReport">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="总分"></el-radio-button>
          <el-radio-button label="科目"></el-radio-button>
        </el-radio-group>
        <div class="type_btn">
          <el-button
            plain
            size="mini"
            @click="$bus.$emit('changeDialogVisible', '科目')"
            >已选科目报表({{ typeBimension("科目").length }})</el-button
          >
          <el-button
            plain
            size="mini"
            @click="$bus.$emit('changeDialogVisible', '总分')"
            >已选总分报表({{ typeBimension("总分").length }})</el-button
          >
        </div>
      </div>
      <div class="bottom">
        报表维度：
        <el-radio-group
          v-model="radioDimension"
          size="mini"
          @change="filterReport"
        >
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="学生"></el-radio-button>
          <el-radio-button label="班级"></el-radio-button>
          <el-radio-button label="学科"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="content">
      <el-table :data="showList" style="width: 100%" border size="small">
        <el-table-column prop="no" label="报表编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="报表名称"> </el-table-column>
        <el-table-column prop="type" label="报表类型" width="180">
        </el-table-column>
        <el-table-column prop="dimension" label="报表维度" width="180">
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <i class="el-icon-view" @click="$bus.$emit('reportShowTable', scope.row)"></i>
            <i
              v-show="!scope.row.falg"
              class="el-icon-circle-plus-outline"
              @click="scope.row.falg = !scope.row.falg"
            ></i>
            <i
              v-show="scope.row.falg"
              class="el-icon-remove-outline"
              @click="scope.row.falg = !scope.row.falg"
            ></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <ReportTable :showList="tableList" />
    <ReportShowTable />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getReport } from "@/api/api.js";
import ReportTable from "@/components/reportTable";
import ReportShowTable from "@/components/reportShowTable";

export default {
  name: "AnalysisReport",
  // 接受父组件传来的参数
  props: {},
  data() {
    return {
      loading: true,
      tableList: [],
      showList: [],
      radioType: "全部",
      radioDimension: "全部",
      reportList: {},
    };
  },
  computed: {
    typeBimension() {
      return (e) => {
        return this.tableList.filter(
          (item) => (e ? item.type === e : true) && item.falg
        );
      };
    },
  },
  components: {
    ReportTable: ReportTable,
    ReportShowTable: ReportShowTable,
  },
  methods: {
    ...mapMutations("analysis", {
      next: "next",
    }),
    begin() {
      this.submit();
    },
    submit() {
      if (this.typeBimension().length > 0) {
        this.next(1);
      } else {
        this.$message.error("请选择报表类型！");
      }
    },
    // 筛选符合条件的表格
    filterReport() {
      let { radioType, radioDimension, tableList } = this;
      let newList = tableList.filter(
        (item) =>
          (radioType === "全部" ? true : item.type === radioType) &&
          (radioDimension === "全部" ? true : item.dimension === radioDimension)
      );
      this.showList = newList;
    },
    // 获取表格数据
    getReport() {
      getReport().then((res) => {
        // 数据聚合
        this.tableList = res.list.reduce((res, item) => {
          res.push({ ...item, falg: false });
          return res;
        }, []);
        this.showList = this.tableList;
        this.loading = false;
      });
    },
  },
  mounted() {
    this.getReport();
  },
};
</script>

<style lang="scss">
#analysisReport {
  margin-top: 20px;
  background: #fff;
  min-height: 582px;
  border-radius: 2px;
  padding: 10px 20px;
  .head {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333;
    display: block;
    position: relative;
    .top,
    .bottom {
      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background: #1dbd84;
        border-radius: 2px;
        border: 1px solid #1dbd84;
        box-shadow: -1px 0 0 0 #1dbd84;
        color: #fff;
      }
    }
    .top {
      margin-bottom: 10px;
      .type_btn {
        float: right;
        .el-button {
          text-align: center;
          width: 120px;
          height: 30px;
          background: linear-gradient(270deg, #17c7bb, #0fbc77);
          border-radius: 2px;
          border: 1px solid #0fbc77;
          float: right;
          padding: 0;
          color: #fff;
          margin: 0 10px;
        }
      }
    }
  }
  .content {
    margin-top: 20px;

    .el-icon-view,
    .el-icon-circle-plus-outline,
    .el-icon-remove-outline {
      font-size: 20px;
      color: #1dbd84;
      margin: 0 10px;
      cursor: pointer;
    }
    .el-icon-remove-outline {
      color: #f56c6c;
    }
  }
}
</style>
