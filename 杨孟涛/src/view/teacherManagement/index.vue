<template>
  <div class="box">
    <div class="top">
      手机号码:<el-input placeholder="请输入内容"></el-input> 姓名:<el-input
        placeholder="请输入内容"
      ></el-input>
      <el-button>查询</el-button>
      <div class="right">
        <el-button
          class="abtn"
          type="success"
          size="small"
          @click="inviteTeacher"
        >
          <i class="el-icon-time"></i>
          邀请教师
        </el-button>
        <el-button class="btn" type="success" size="small" @click="newTeacher">
          <i class="el-icon-plus"></i>
          新增教师
        </el-button>
      </div>
    </div>

    <div class="content">
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="编号" width="60px">
          </el-table-column>
          <el-table-column prop="phone" label="手机号"> </el-table-column>
          <el-table-column prop="name" label="教师姓名"> </el-table-column>
          <el-table-column prop="" label="学段"> </el-table-column>
          <el-table-column prop="" label="任教科目"></el-table-column>
          <el-table-column prop="" label="任教年级/班级"> </el-table-column>
          <el-table-column prop="date" label="更新时间"> </el-table-column>
          <el-table-column prop="" label="状态">
            <template slot-scope="scope">
              <div>
                <el-button
                  v-if="scope.row.status === 0"
                  @click="handleClick(scope.row, 1)"
                  size="small"
                  type="success"
                  >正常
                </el-button>
                <el-button
                  v-if="scope.row.status === 1"
                  @click="handleClick(scope.row, 0)"
                  size="small"
                  type="danger"
                  >禁用
                </el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作">
            <i class="el-icon-edit-outline icon"></i>           
            <i class="el-icon-delete-solid icon"></i>
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
import { getSchoolApply } from "../../api/api";
export default {
  name: "applicationAdmin",
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 10,
      },
      tableData: [],
      total: 0,
    };
  },
  methods: {
    // 获取页面数据
    getSchoolApply() {
      this.loading = true;
      getSchoolApply(this.page).then((res) => {
        let { data } = res;
        this.tableData = data.list;
        // console.log(data.list);
        this.total = data.num;
      });
    },
    // 点击table按钮
    handleClick(row, status) {
      row.status = status;
    },
    // 页码
    // 修改当前条目
    changeSize(e) {
      this.page.pageSize = e;
      this.page.pageIndex = 1; //更改条目 也将页码重置
      this.getSchoolApply();
    },
    // 修改当前页数
    changePage(e) {
      this.page.pageIndex = e;
      this.getSchoolApply();
    },
    // 查询
    search() {
      this.page.pageIndex = 1;
      this.getSchoolApply();
    },
  },
  mounted() {
    this.getSchoolApply();
  },
};
</script>

 <style lang='scss'>
.box {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 10px 10px;
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
      margin-left: 30px;
    }
    .right {
      float: right;
    }
  }
  .content {
    width: 100%;
    margin-top: 10px;
    .el-table td {
      padding: 8px 0;
    }

    .icon {
      margin-left: 20px;
      color: #1dbd84;
    }
  }
  .bottom {
    position: relative;
    bottom: 0px;
    position: absolute;
    right: 10px;
    bottom: 20px;
  }
}
</style>