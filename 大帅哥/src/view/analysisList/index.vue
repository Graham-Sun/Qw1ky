<template>
  <div id="teacher" v-loading="loading">
    <div class="header">
      成绩分析名称：<el-input
        placeholder="请输入成绩分析名称"
        v-model="page.name"
        clearable
        size="mini"
        class="input"
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
          @click="toAnalysisBuilt"
        >
          新建分析
        </el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      class="table"
      size="small"
    >
      <el-table-column prop="grade" label="成绩分析名称"> </el-table-column>
      <el-table-column
        prop="stage"
        label="学段"
        :formatter="(row) => this.stage[row.stage]"
      >
      </el-table-column>
      <el-table-column
        prop="class"
        label="年级"
        :formatter="(row) => this.class[row.class]"
      >
      </el-table-column>
      <el-table-column
        prop="year"
        label="入学年份"
        :formatter="(row) => `${row.year}年`"
      >
      </el-table-column>
      <el-table-column prop="time" label="考试时间"> </el-table-column>
      <el-table-column
        prop="type"
        label="分析类型"
        :formatter="(row) => this.type[row.type]"
      >
      </el-table-column>
      <el-table-column prop="name" label="创建人"> </el-table-column>
      <el-table-column prop="date" label="创建时间"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag
            v-show="scope.row.status === 0"
            style="cursor: pointer"
            @click="toAnalysisBuilt(scope.row)"
            >参数设置</el-tag
          >
          <el-tag
            v-show="scope.row.status === 1"
            style="cursor: pointer"
            type="success"
            >分析完成</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      background
      @size-change="changeSize"
      @current-change="changePage"
      :current-page="page.pageIndex"
      :page-sizes="[5, 10]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getAnalysis } from "@/api/api";
import { mapState, mapMutations } from "vuex";
export default {
  name: "analysis",
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 10,
        name: "",
        type: "",
        status: "",
      },
      tableData: [],
      total: 0,
      loading: false,
    };
  },
  computed: {
    ...mapState("teacherInfo", {
      stage: "stage",
    }),
    ...mapState("analysis", {
      class: "class",
      type: "type",
    }),
  },
  methods: {
    ...mapMutations("analysis", {
      set_analysis: "set_analysis",
    }),
    getAnalysis() {
      this.loading = true;
      getAnalysis(this.page).then((res) => {
        let { data } = res;
        this.tableData = data.list;
        this.total = data.num;
        this.loading = false;
      });
    },
    // 跳转到新建页面
    toAnalysisBuilt(row) {
      let analysis = { id: row.id || "", step: Number(row.step) || 3 };
      this.set_analysis(analysis);
      this.$router.push({
        name: "analysis_analysisBuilt",
      });
    },
    // 点击table按钮
    handleClick(row, status) {
      row.status = status;
    },
    // 修改当前条目数量
    changeSize(e) {
      this.page.pageSize = e;
      this.page.pageIndex = 1;
      this.getAnalysis();
    },
    // 修改当前页数
    changePage(e) {
      this.page.pageIndex = e;
      this.getAnalysis();
    },
    // 查找当前列表
    search() {
      this.page.pageIndex = 1;
      this.getAnalysis();
    },
    // 重置搜索条件
    clean() {
      this.page.name = "";
      this.page.type = "";
      this.page.status = "";
      this.page.pageIndex = 1;
      this.getAnalysis();
    },
    changeTeacherInfo(e) {
      let index = this.tableData.findIndex((item) => item.id === e.id);
      this.tableData.splice(index, 1, e);
    },
  },
  mounted() {
    this.getAnalysis();
  },
};
</script>

<style lang="scss">
#teacher {
  padding: 20px;
  min-width: 95%;
  min-height: 740px;
  background: #fff;
  position: relative;

  .header {
    padding: 0 20px 20px 0px;
    font-size: 12px;

    .input {
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

  .page {
    position: absolute;
    right: 20px;
    bottom: 20px;

    .active {
      background-color: #1dbd84 !important;
    }
  }
  .table {
    .el-icon-edit-outline,
    .el-icon-delete {
      font-size: 16px;
      color: #1dbd84;
      margin: 0 10px;
      cursor: pointer;
    }
    .el-icon-delete {
      color: #d54141;
    }
  }
}
</style>
