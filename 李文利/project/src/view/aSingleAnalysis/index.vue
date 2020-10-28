<template>
  <div id="aSingleAnalysis">
    <div v-if="toggle">
      <div class="header">
        <el-form :inline="true" :data="tableData" class="demo-form-inline">
          <el-form-item label="成绩分析名称：">
            <el-input
              placeholder="请输入科目名称"
              v-model="tableData.grade"
            ></el-input>
          </el-form-item>
          <el-form-item label="分析类型：">
            <el-select v-model="tableData.type" placeholder="请选择">
              <el-option label="单次基本分析" value="11"></el-option>
              <el-option label="总分基本分析" value="22"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select v-model="tableData.status" placeholder="请选择">
              <el-option label="参数设置" value="33"></el-option>
              <el-option label="分析完成" value="44"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="考试时间:">
            <el-input type="date" placeholder="请选择日期" value=""></el-input>
          </el-form-item>
          <el-form-item class="top-r">
            <el-button class="one">查询</el-button>
            <el-button class="abb" icon="el-icon-plus" @click="create"
              >新增分析</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" border size="small">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="grade" label="成绩分析名称"></el-table-column>
        <el-table-column
          prop="stage"
          label="学段"
          :formatter="formatterStage"
        ></el-table-column>
        <el-table-column
          prop="class"
          label="年级"
          :formatter="formatterClass"
        ></el-table-column>
        <el-table-column
          prop="year"
          label="入学年份"
          :formatter="formatterYear"
        ></el-table-column>
        <el-table-column prop="date" label="考试时间"></el-table-column>
        <el-table-column
          prop="type"
          label="分析类型"
          :formatter="formatterType"
        ></el-table-column>
        <el-table-column prop="name" label="创建人"></el-table-column>
        <el-table-column prop="time" label="创建时间"></el-table-column>
        <el-table-column
          prop="condition"
          label="状态"
          :formatter="formatterCondition"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              v-if="scope.row.condition === 1"
              size="small"
              >参数设置</el-button
            >
            <el-button
              type="success"
              v-if="scope.row.condition === 2"
              size="small"
              >分析完成</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChange"
        @current-change="indexChange"
        :current-page="page.pageIndex"
        background
        :page-sizes="[5, 10]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <div v-else>
      <CreateAnalyse />
    </div>
  </div>
</template>

<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from "vuex";
import { getASingleData } from "@/api/api";
export default {
  name: "ASingleAnalysis",
  data() {
    return {
      page: {
        pageIndex: 1, //当前显示页
        pageSize: 10, //每页显示多少条数据
        phone: "",
        name: "",
      },
      tableData: [],
      total: 0,
      toggle: false,
    };
  },
  // data() {
  //   return {
  //     tableData: {
  //       id: "",
  //       serial: "",
  //       name: "",
  //       grade: "",
  //       stage: "",
  //       year: "",
  //       date: "",
  //       type: "",
  //       class: "",
  //       time: "",
  //       status: "",
  //     },
  //   };
  // },
  computed: {
    ...mapState("EXITTEACHER", {
      stage: "stage",
      class: "class",
      year: "year",
      status: "status",
      type: "type",
    }),
  },
  methods: {
    //新增分析
    create() {},
    // 获取当前行数据，并格式化(尽量减少对原数据的修改)
    //年份
    formatterYear(row) {
      return this.year[row.year];
    },
    //班级
    formatterClass(row) {
      return this.class[row.class];
    },
    //学段
    formatterStage(row) {
      return this.stage[row.stage];
    },
    //状态
    formatterCondition(row) {
      console.log(row.condition, this.conditionc);
      return this.condition[row.condition];
    },
    //类型
    formatterType(row) {
      return this.type[row.type];
    },
    //查询
    search() {
      this.page.pageIndex = 1;
      this.page.phone = "";
      this.page.name = "";
      this.getASingleData();
    },
    //切换每页的数据条目
    sizeChange(val) {
      this.page.pageSize = val;
      this.page.pageIndex = 1;
      this.getASingleData();
    },
    //更改当前页
    indexChange(val) {
      console.log(val);
      this.page.pageIndex = val;
      this.getASingleData();
    },
    //点击 通过或拒绝按钮 他的status状态改变
    handleClick(row, status) {
      row.status = status;
    },
    //获取数据
    getASingleData() {
      this.loading = true;
      getASingleData(this.page).then((res) => {
        this.tableData = res.data.list;
        console.log(this.tableData);
        this.total = res.data.num;
      });
    },
  },

  mounted() {
    this.getASingleData();
  },
};
</script>

<style lang = "scss">
#aSingleAnalysis {
  width: 100%;
  height: 100%;
  .header {
    height: 60px;
    line-height: 40px;
    display: flex;
    margin-left: 20px;

    .top-r {
      position: absolute;
      top: 100px;
      right: 10px;
      .abb,
      .one {
        background: #1dbd84;
        color: #fff;
      }
    }
  }
  .el-pagination {
    position: absolute;
    right: 50px;
    bottom: 70px;
  }
}
</style>