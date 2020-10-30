<template>
  <div id="aSingleList">
    <div class="header">
      成绩分析名称：<el-input
        placeholder="请输入成绩分析名称"
        v-model="page.name"
        clearable
        size="mini"
        class="inputV"
      >
      </el-input>
      分析类型：
      <el-select
        v-model="page.type"
        size="small"
        filterable
        placeholder="请选择分析类型"
      >
        <el-option
          v-for="(item, key, index) in type"
          :key="index"
          :label="item"
          :value="key"
        >
        </el-option>
      </el-select>
      状态：<el-select
        size="small"
        v-model="page.status"
        filterable
        placeholder="请选择状态"
      >
        <el-option label="参数设置" :value="0"></el-option>
        <el-option label="分析完成" :value="1"></el-option>
      </el-select>
      <el-button class="btn" type="success" size="small" @click="search">
        查询
      </el-button>
      <el-button class="btn" type="success" size="small" @click="clean">
        重置
      </el-button>
      <div class="right_btn">
        <el-button
          class="btn_add"
          type="success"
          icon="el-icon-plus"
          size="small"
          @click="newParams"
        >
          新建分析
        </el-button>
      </div>
    </div>
    <el-table :data="tableData" border size="small">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="grade" label="成绩分析名称"></el-table-column>
      <el-table-column
        prop="stage"
        label="学段"
        :formatter="(row) => this.stage[row.stage]"
      ></el-table-column>
      <el-table-column
        prop="class"
        label="年级"
        :formatter="(row) => this.class[row.class] + '级'"
      ></el-table-column>
      <el-table-column prop="year" label="入学年份"></el-table-column>
      <el-table-column prop="date" label="考试时间"></el-table-column>
      <el-table-column
        prop="type"
        label="分析类型"
        :formatter="(row) => this.type[row.type]"
      ></el-table-column>
      <el-table-column prop="name" label="创建人"></el-table-column>
      <el-table-column prop="time" label="创建时间"></el-table-column>
      <el-table-column prop="condition" label="状态">
        <template slot-scope="scope">
          <el-button
            type="primary"
            v-if="scope.row.status === 0"
            size="small"
            @click="newParams(scope.row)"
            >参数设置</el-button
          >
          <el-button type="success" v-if="scope.row.status === 1" size="small"
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
</template>

<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from "vuex";
import { getASingleData } from "@/api/api";
import { _str } from "@/utils/collection";

export default {
  name: "ASingleList",
  data() {
    return {
      page: {
        pageIndex: 1, //当前显示页
        pageSize: 10, //每页显示多少条数据
        name: "",
        type: "",
        status: "",
      },
      tableData: [],
      total: 0,
      toggle: true,
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
    }),
    ...mapState("ASINGLE", {
      class: "class",
      year: "year",
      status: "status",
      type: "type",
    }),
  },
  methods: {
    //新增分析
    newParams(row) {
      if (row.subject) {
        sessionStorage.setItem("row", _str(row));
        this.$router.push({ name: "ASingleAnalysis_CreateAnalyse" });
        return;
      } else {
        sessionStorage.removeItem("row");
        this.$router.push({ name: "ASingleAnalysis_CreateAnalyse" });
      }

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
    // 重置搜索条件
    clean() {
      this.page.name = "";
      this.page.type = "";
      this.page.status = "";
      this.page.pageIndex = 1;
      this.getASingleData();
    },
    //获取数据
    getASingleData() {
      this.loading = true;
      getASingleData(this.page).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.num;
      });
    },
  },

  mounted() {
    this.getASingleData();
  },
};
</script>

<style lang = "scss" scoped>
#aSingleList {
  min-width: 95%;
  min-height: 780px;
  background: #fff;
  position: relative;
  .header {
    width: 100%;
    background: #fff;
    height: 60px;
    line-height: 60px;
    font-size: 12px;
    padding-left: 20px;
    box-sizing: border-box;
    .inputV {
      width: 200px;
      margin-right: 10px;
    }
    .el-select {
      margin-right: 10px;
    }

    .btn {
      background: #1dbd84;
      height: 28px;
      line-height: 0px;
      margin-left: 10px;
    }

    .right_btn {
      float: right;
      .btn_add {
        background: #1dbd84;
      }
      .btn_share,
      .btn_add {
        height: 28px;
        line-height: 0px;
      }
    }
  }
  .el-table {
    margin-top: 10px;
  }
  .el-pagination {
    position: absolute;
    right: 50px;
    bottom: 20px;
  }
}
</style>