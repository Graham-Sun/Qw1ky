<template>
  <div class="box" v-loading="loading">
    <div class="top">
      手机号码:<el-input v-model="phone" placeholder="请输入内容"></el-input>
      姓名:<el-input v-model="name" placeholder="请输入内容"></el-input>
      <el-button @click="search">查询</el-button>
      <el-button @click="clean">重置</el-button>
    </div>

    <div class="content">
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="age" label="年龄"> </el-table-column>
          <el-table-column prop="sex" label="性别" :formatter="formatter">
          </el-table-column>
          <el-table-column prop="phone" label="手机号"> </el-table-column>

          <el-table-column prop="date" label="日期"> </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <div v-if="scope.row.status == 0">
                <el-button
                  @click="handleClick(scope.row, 1)"
                  size="small"
                  type="success"
                  >通过</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="handleClick(scope.row, 2)"
                  >拒绝</el-button
                >
              </div>
              <el-tag v-if="scope.row.status === 1" type="success"
                >已通过</el-tag
              >
              <el-tag v-if="scope.row.status === 2" type="danger"
                >已拒绝</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="bottom">
      <div class="block">
        <el-pagination
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
    </div>
  </div>
</template>

 <script>
import { getApply } from "@/api/api";
export default {
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
    // 获取页面数据
    getApply() {
      this.loading = true;
      getApply(this.page).then((res) => {
        let { data } = res;
        // 点击通过拒绝后的效果
        this.tableData = data.list;
        // console.log(data.list);
        this.total = data.num;
        this.loading = false;
      });
    },

    // 点击按钮
    handleClick(row, status) {
      row.status = status;
    },

    // 用来格式化内容
    formatter(row) {
      //有四个参数 （row,column,cellValue,index）
      // 转换性别
      return row.sex ? "男" : "女";
    },

    // 页码
    // 修改当前条目
    changeSize(e) {
      this.page.pageSize = e;
      this.page.pageIndex = 1; //更改条目 也将页码重置
      this.getApply();
    },
    // 修改当前页数
    changePage(e) {
      this.page.pageIndex = e;
      this.getApply();
    },
    // 查询
    search() {
      this.page.pageIndex = 1;
      this.getApply();
    },
    // 重置
    clean() {
      this.page.phone = "";
      this.page.name = "";
      this.page.pageIndex = 1;
      this.getApply();
    },
  },
  mounted() {
    this.getApply();
  },
};
</script>

 <style lang='scss'>
.box {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 10px 20px;
  box-sizing: border-box;
  position: relative;
  .top {
    // background-color: aquamarine;
    margin-top: 6px;
    .el-input {
      width: 300px;

      margin-left: 10px;
      margin-right: 20px;
    }
    .el-button {
      width: 100px;
      background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%);
      color: #fff;
      margin-left: 130px;
    }
  }
  .content {
    width: 100%;
    // min-height: 740px;
    // background-color: salmon;
    margin-top: 10px;
  }
  .bottom {
    // background-color: red;
    position: relative;
    bottom: 0px;
    // text-align: right;
    position: absolute;
    right: 10px;
    bottom: 20px;
    .el-pagination {
      .active {
        background-color: #0fbc77 !important;
      }
    }
  }
}
</style>