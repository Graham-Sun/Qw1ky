<template>
  <div id="apply" v-loading="loading">
    <div class="header">
      手机号码：<el-input placeholder="请输入手机号" v-model="page.phone" clearable size="mini" class="input">
      </el-input>
      姓名：<el-input placeholder="请输入姓名" v-model="page.name" clearable size="mini" class="input">
      </el-input>
      <el-button class="btn" type="success" size="small" @click="search">
        查询
      </el-button>
      <el-button class="btn" type="success" size="small" @click="clean">
        重置
      </el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="教师姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="sex" label="性别" :formatter="formatter">
      </el-table-column>
      <el-table-column prop="phone" label="手机号码"> </el-table-column>
      <el-table-column prop="date" label="申请时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 0">
            <el-button @click="handleClick(scope.row, 1)" size="small" type="success">通过</el-button>
            <el-button type="danger" size="small" @click="handleClick(scope.row, 2)">拒绝</el-button>
          </div>
          <el-tag v-if="scope.row.status === 1" type="success">已通过</el-tag>
          <el-tag v-if="scope.row.status === 2" type="danger">已拒绝</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="page" background @size-change="changeSize" @current-change="changePage"
      :current-page="page.pageIndex" :page-sizes="[5, 10]" :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import { getSchoolApply } from "@/api/api";
  export default {
    name: "applicationAdmin",
    data() {
      return {
        page: {
          pageIndex: 1,
          pageSize: 10,
          phone: "",
          name: "",
        },
        tableData: [],
        total: 0,
        loading: false,
      };
    },
    methods: {
      getSchoolApply() {
        this.loading = true;
        getSchoolApply(this.page).then((res) => {
          let { data } = res;
          this.tableData = data.list;
          this.total = data.num;
          this.loading = false;
        });
      },
      // 点击table按钮
      handleClick(row, status) {
        row.status = status;
      },
      // 获取当前行数据，并格式化(尽量减少对原数据的修改)
      formatter(row) {
        return row.sex ? "男" : "女";
      },
      // 修改当前条目数量
      changeSize(e) {
        this.page.pageSize = e;
        this.page.pageIndex = 1;
        this.getSchoolApply();
      },
      // 修改当前页数
      changePage(e) {
        this.page.pageIndex = e;
        this.getSchoolApply();
      },
      // 查找当前列表
      search() {
        this.page.pageIndex = 1;
        this.getSchoolApply();
      },
      // 重置搜索条件
      clean() {
        this.page.phone = "";
        this.page.name = "";
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
    min-width: 95%;
    min-height: 94%;
    background: #fff;
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

    .page {
      position: absolute;
      right: 20px;
      bottom: 20px;

      .active {
        background-color: #1dbd84 !important;
      }
    }
  }
</style>