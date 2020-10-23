<template>
  <div id="apply">
    <div class="header">
      手机号码：<el-input
        placeholder="请输入手机号"
        v-model="search.phone"
        clearable
        size="mini"
        class="input"
      >
      </el-input>
      姓名：<el-input
        placeholder="请输入姓名"
        v-model="search.name"
        clearable
        size="mini"
        class="input"
      >
      </el-input>
      <el-button class="btn" type="success" size="small">
        查询
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
      size="small"
      class="table"
    >
      <el-table-column prop="name" label="教师姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        :formatter="formatter"
      ></el-table-column>
      <el-table-column prop="phone" label="手机号码"> </el-table-column>
      <el-table-column prop="date" label="申请时间"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.status === 0">
            <el-button
              @click="successClick(scope.row, 1)"
              type="success"
              size="small"
              class="okBtn"
            >
              通过
            </el-button>
            <el-button
              @click="successClick(scope.row, 2)"
              type="danger"
              size="small"
              class="noBtn"
              >拒绝</el-button
            >
          </div>
          <el-tag v-if="scope.row.status === 1" type="success">已通过</el-tag>
          <el-tag v-if="scope.row.status === 2" type="danger">已拒绝</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageNum"
      @current-change="changePage"
      :current-page.sync="page.pageIndex"
      @size-change="changeSize"
      :page-sizes="[5, 10]"
      :page-size="page.pageSize"
    ></el-pagination>
  </div>
</template>

<script>
import { getSchoolApply } from "@/api/api";
export default {
  name: "applicationAdmin",
  data() {
    return {
      tableData: [],
      pageNum: 0,
      page: {
        pageIndex: 1,
        pageSize: 10,
      },
      loading: false,
      search: {
        phone: "",
        name: "",
      },
    };
  },
  methods: {
    getSchoolApply() {
      this.loading = true;
      getSchoolApply(this.page).then((res) => {
        let { data } = res;
        this.tableData = data.list;
        this.pageNum = data.num;
        this.loading = false;
      });
    },
    formatter(row) {
      return row.sex ? "男" : "女";
    },
    successClick(data, type) {
      data.status = type;
    },
    // 修改pageIndex
    changePage(pageIndex) {
      this.page.pageIndex = pageIndex;
      this.getSchoolApply();
    },
    // 修改pageSize
    changeSize(pageSize) {
      this.page.pageSize = pageSize;
      this.page.pageIndex = 1;
      this.getSchoolApply();
    },
  },
  mounted() {
    this.getSchoolApply();
  },
};
</script>

<style lang="scss">
#apply {
  padding: 20px;
  background: #fff;
  min-height: 94%;
  position: relative;

  .header {
    padding: 0 20px 20px 0px;
    font-size: 12px;
    .input {
      width: 200px;
      margin-right: 20px;
    }
    .btn {
      background: #1dbd84;
      height: 28px;
      line-height: 0px;
    }
  }

  .table {
    .okBtn,
    .noBtn {
      height: 32px;
    }
    .okBtn {
      background: #1dbd84;
    }
    .noBtn {
      background: #d54141;
    }
  }

  .page {
    float: right;
    padding: 0px;
    position: absolute;
    right: 20px;
    bottom: 10px;
    .active {
      background: #1dbd84 !important;
    }
  }
}
</style>
