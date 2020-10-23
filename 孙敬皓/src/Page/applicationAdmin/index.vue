<template>
  <div id="apply">
    <div class="header">
      手机号码：<el-input placeholder="请输入手机号" v-model="page.phone" clearable size="mini" class="input">
      </el-input>
      姓名：<el-input placeholder="请输入姓名" v-model="page.name" clearable size="mini" class="input">
      </el-input>
      <el-button class="btn" type="success" size="small" @click="search">
        查询
      </el-button>
      <el-button class="btn" type="success" size="small" @click="clear">
        重置
      </el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%;" :row-class-name="tableRowClassName" size="mini">
        <el-table-column prop="name" label="教师姓名">
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="sex" label="性别" :formatter="formatter">
        </el-table-column>
        <el-table-column prop="phone" label="手机号码">
        </el-table-column>
        <el-table-column fixed prop="date" label="申请时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 0">
              <el-button @click="handleClick(scope.row, 1)" size="small" type="success">通过</el-button>
              <el-button @click="handleClick(scope.row, 2)" type="danger" size="small">拒绝</el-button>
            </div>
            <el-tag v-if="scope.row.status === 1" type="success">已通过</el-tag>
            <el-tag v-if="scope.row.status === 2" type="danger">已拒绝</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination class="page" background @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="page.pageIndex" :page-sizes="[5, 10]" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>

</template>

<script>
  import { getTeacherApply } from "@/api/httpApi";
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
        total: 0
      }
    },
    methods: {
      //请求页面数据
      getTeacherApply() {
        getTeacherApply(this.page).then(res => {
          let { data } = res
          this.tableData = data.data.list
          this.total = data.data.num
        })
      },
      // 点击table按钮
      handleClick(row, status) {
        row.status = status;
      },
      //表格颜色
      tableRowClassName({ rowIndex }) {
        if (rowIndex % 2 === 0) {
          return 'odd-row';
        } else if (rowIndex % 2 === 1) {
          return 'even-row';
        }
        return '';
      },
      //规范table格式
      formatter(row) {
        return row.sex ? "男" : "女"
      },
      //使页面展示数目改变时
      handleSizeChange(e) {
        this.page = {
          pageIndex: 1,
          pageSize: e
        }
        this.getTeacherApply()
      },
      //当点击页码  改变时
      handleCurrentChange(e) {
        this.page.pageIndex = e
        this.getTeacherApply()
      },
      //点击查询按钮
      search() {
        this.page.pageIndex = 1
        this.getTeacherApply();
      },
      //点击重置按钮
      clear() {
        this.page = {
          phone: "",
          name: "",
          pageIndex: 1
        }
        this.getTeacherApply();
      }
    },
    mounted: function () {
      this.getTeacherApply()
    }
  }
</script>

<style lang="scss">
  #apply {
    padding: 20px;
    min-width: 95%;
    min-height: 90%;
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

    .el-table .odd-row {
      background: oldlace;
    }

    .el-table .even-row {
      background: #f0f9eb;
    }

    el-table {}

    .page {
      position: absolute;
      right: 0px;
      bottom: 0px;

      .active {
        background-color: #1dbd84 !important;
      }
    }
  }
</style>