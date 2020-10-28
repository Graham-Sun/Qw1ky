<template>
  <div class="box" v-loading="loading">
    <div class="top">
      手机号码:<el-input
        v-model="page.phone"
        placeholder="请输入内容"
      ></el-input>
      姓名:<el-input v-model="page.name" placeholder="请输入内容"></el-input>
      <el-button class="abb" @click="search">查询</el-button>
      <el-button class="abb" @click="clean">重置</el-button>
      <div class="top-r">
        <el-button class="one" icon="el-icon-share">邀请教师</el-button>
        <el-button
          class="abb"
          icon="el-icon-plus"
          @click="$refs.addSchool.visible = true"
          >新增教师</el-button
        >
      </div>
    </div>

    <div class="content">
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            prop="id"
            label="编号"
            fixed="left"
            width="90px"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            fixed="left"
            width="250px"
          >
          </el-table-column>
          <el-table-column prop="name" label="教师姓名"> </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            :formatter="formatter"
          ></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column
            prop="subject"
            label="任教科目"
            :formatter="formatterSubject"
          ></el-table-column>
          <el-table-column
            prop="stage"
            label="学段"
            :formatter="formatterStage"
          ></el-table-column>
          <el-table-column prop="date" label="更新时间"> </el-table-column>

          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 1" type="success">正常</el-tag>
              <el-tag v-if="scope.row.status === 0" type="danger">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <i class="icon el-icon-edit" @click="$refs.addSchool.open(scope.row)"></i>
              <i class="icons el-icon-delete"></i>
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
        <AddSchool
          ref="addSchool"
          :stage="stage"
          :subject="subject"
          :sex="sex"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
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
    .abb {
      width: 100px;
      background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%);
      color: #fff;
      margin-left: 20px;
    }
    .top-r {
      position: absolute;
      top: 15px;
      right: 10px;
      cursor: pointer;
      .one {
        background-color: #fff;
        color: #17c7bb;
      }
    }
  }
  .content {
    width: 100%;
    // min-height: 740px;
    // background-color: salmon;
    margin-top: 10px;
    .icon {
      font-size: 20px;
      color: #0fbc77;
      margin-left: 6px;
    }
    .icons {
      font-size: 20px;
      color: red;
      margin-left: 22px;
    }
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