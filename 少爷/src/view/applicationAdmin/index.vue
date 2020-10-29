<template>
  <div class="box">
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="教师姓名"> </el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          :formatter="formatter"
        ></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="date" label="申请时间"></el-table-column>
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
                @click="handleClick(scope.row, 2)"
                type="danger"
                >拒绝</el-button
              >
            </div>
            <el-tag v-if="scope.row.status === 1" type="success">已通过</el-tag>
            <el-tag v-if="scope.row.status === 2" type="danger">已拒绝</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom">
      <el-pagination
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
</template>

<script>
import { getSchoolApply } from "../../api/api";
export default {
  name: "applicationAdmin",
  data() {
    return {
      tableData: [],
      total: 0,
      page: {
        pageIndex: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    getSchoolApply() {
      getSchoolApply(this.page).then((res) => {
        let { data } = res;
        this.tableData = data.list;
        this.total = data.num;
        console.log(res);
      });
    },
    //点击table按钮
    handleClick(row, status) {
      row.status = status;
    },
    // 获取当前行数据，并格式化(尽量减少对原数据的修改)
    formatter(row) {
      return row.sex ? "男" : "女";
    },
    // 修改当前页数
    changePage(e) {
      this.page.pageIndex = e;
      this.getSchoolApply();
    },
    // 修改当前条目数量
    changeSize(e) {
      this.page.pageSize = e;
      this.page.pageIndex = 1;
      this.getSchoolApply();
    },
  },
  mounted() {
    this.getSchoolApply();
  },
};
</script>
<style>
.bottom {
  position: absolute;
  bottom: 80px;
  right: 10px;
}
</style>