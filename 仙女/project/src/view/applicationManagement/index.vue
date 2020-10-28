<template>
  <div id="applicationManagement" v-loading="loading">
    <div class="header">
      <div class="inputContent">
        <span>手机号码：</span
        ><el-input placeholder="请输入手机号" v-model="page.phone"></el-input>
      </div>
      <div class="inputContent">
        <span>姓名：</span
        ><el-input placeholder="请输入姓名" v-model="page.name"></el-input>
      </div>
      <el-button class="btn" type="success" @click="search">查询</el-button>
    </div>
    <el-table :data="tableData" border>
      <el-table-column prop="name" label="教师名称"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="date" label="申请时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--slot-scope="scope" 相当于===>（item）in tableData, scope===item,  tableData中有status的状态，所以此时可以直接获取
            0==>显示通过和拒绝  1==>显示已通过 2==>显示已拒绝
            这里是通过浅拷贝的方式，将一个指针地址的值，进行重新赋值，所以会修改页面点击状态
          -->
          <div v-if="scope.row.status == 0">
            <el-button
              size="mini"
              type="success"
              @click="handleClick(scope.row, 1)"
              >通过</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleClick(scope.row, 2)"
              >拒绝</el-button
            >
          </div>
          <el-tag v-if="scope.row.status == 1" type="success">已通过</el-tag>
          <el-tag v-if="scope.row.status == 2" type="danger">已拒绝</el-tag>
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
import {
    getApplicationData
} from "@/api/api"
export default {
  name: "ApplicationManagement",
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
      loading: false,
    };
  },
  methods: {
    //查询
    search() {
      this.page.pageIndex = 1;
      this.page.phone = "";
      this.page.name = "";
      this.getApplicationData();
    },
    //切换每页的数据条目
    sizeChange(val) {
      this.page.pageSize = val;
      this.page.pageIndex = 1;
      this.getApplicationData();
    },
    //更改当前页
    indexChange(val) {
      console.log(val);
      this.page.pageIndex = val;
      this.getApplicationData();
    },
    //点击 通过或拒绝按钮 他的status状态改变
    handleClick(row, status) {
      /*
      row 是单击通过或拒绝按钮时，拿到当前单击的那一行的一整条数据
      将这一行中的statusz状态 通过传参方式 进行修改 
        当传入的参数为1时，status === 1,显示已通过按钮
        当传入的参数为2时，status === 2,显示已拒绝按钮
        这里是通过浅拷贝的方式进行赋值，作用是为了将一个指针地址的值，进行重新赋值，所以会修改点击状态
      */
      row.status = status;
    },
    //获取数据
    getApplicationData() {
      this.loading = true;
      getApplicationData(this.page).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.num;
        this.loading = false;
      });
    },
  },

  mounted: function () {
    this.getApplicationData();
  },
};
</script>

<style lang="scss">
#applicationManagement {
  width: 98%;
  height: 94%;
  padding: 20px;
  background-color: #fff;
  position: relative;
  .header {
    height: 60px;
    line-height: 40px;
    display: flex;
    margin-left: -20px;
    .inputContent {
      display: flex;
      span {
        display: inline-block;
        width: 200px;
        height: 20px;
      }
      .el-input__inner {
        width: 270px;
        margin-left: -50px;
      }
      &:nth-child(2) {
        margin-left: -50px;
      }
    }
  }
  .el-pagination {
    position: absolute;
    right: 50px;
    bottom: 10px;
  }
  .btn {
    height: 36px;
  }
}
</style>