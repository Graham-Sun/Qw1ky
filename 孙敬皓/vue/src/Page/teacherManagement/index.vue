<template>
  <div id="apply" v-loading="loading">
    <div class="header">
      <div class="left">
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
      <div class="right">
        <el-button class="abtn" type="success" size="small" @click="inviteTeacher">
          <i class="el-icon-time"></i>
          邀请教师
        </el-button>
        <el-button class="btn" type="success" size="small" @click="newTeacher">
          <i class="el-icon-plus"></i>
          新增教师
        </el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%;" :row-class-name="tableRowClassName" size="mini">
        <el-table-column prop="id" label="编号">
        </el-table-column>
        <el-table-column prop=" phone" label="手机号码">
        </el-table-column>
        <el-table-column prop="name" label="教师姓名">
        </el-table-column>
        <el-table-column prop="phase" label="学段">
        </el-table-column>
        <el-table-column prop="subject" label="任教年级/班级">
        </el-table-column>
        <el-table-column prop="class" label="任教科目">
        </el-table-column>
        <el-table-column prop="date" label="更新时间">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <div>
              <el-button v-if="scope.row.status === 0" @click="handleClick(scope.row, 1)" size="small" type="success">正常
              </el-button>
              <el-button v-if="scope.row.status === 1" @click="handleClick(scope.row, 0)" size="small" type="danger">禁用
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <i class="el-icon-edit-outline icon"></i>
          <i class="el-icon-delete-solid icon"></i>
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
        total: 0,
        loading: true
      }
    },
    methods: {
      //请求页面数据
      getTeacherApply() {
        getTeacherApply(this.page).then(res => {
          let { data } = res
          this.tableData = data.data.list
          this.total = data.data.num
          this.loading = false
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
      display: flex;
      justify-content: space-between;

      .input {
        width: 200px;
        margin-right: 20px;
      }

      .abtn {
        background: #fff;
        color: #1dbd84;
        height: 28px;
        line-height: 0px;
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

    .icon {
      margin-left: 20px;
      color: #1dbd84;
    }

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