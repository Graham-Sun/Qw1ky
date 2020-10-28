<template>
  <div id="teacher" v-loading="loading">
    <div class="header">
      手机号码：<el-input
        placeholder="请输入手机号"
        v-model="page.phone"
        clearable
        size="mini"
        class="input"
      >
      </el-input>
      姓名：<el-input
        placeholder="请输入姓名"
        v-model="page.name"
        clearable
        size="mini"
        class="input"
      >
      </el-input>
      <el-button class="btn" type="success" size="small" @click="search">
        查询
      </el-button>
      <el-button class="btn" type="success" size="small" @click="clean">
        重置
      </el-button>
      <div class="right_btn">
        <el-button class="btn_share" icon="el-icon-share" size="small">
          邀请教师
        </el-button>
        <el-button
          class="btn_add"
          type="success"
          icon="el-icon-plus"
          size="small"
          @click="$refs.editTeacherInfo.visible = true"
        >
          新增教师
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
      <el-table-column prop="phone" label="手机号码"> </el-table-column>
      <el-table-column prop="name" label="教师姓名"> </el-table-column>
      <el-table-column prop="stage" label="学段" :formatter="formatterStage">
      </el-table-column>
      <el-table-column
        prop="subject"
        label="任教科目"
        :formatter="formatterSubject"
      >
      </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="sex" label="性别" :formatter="formatter">
      </el-table-column>
      <el-table-column prop="date" label="更新时间"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" type="danger">禁用</el-tag>
          <el-tag v-if="scope.row.status === 1" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <i
            class="el-icon-edit-outline"
            @click="$refs.editTeacherInfo.edit(scope.row)"
          />
          <i class="el-icon-delete" />
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
    <EditTeacherDialog
      ref="editTeacherInfo"
      :stage="stage"
      :subject="subject"
      :sex="sex"
    />
  </div>
</template>

<script>
import { getTeacherList } from "@/api/api";
import { mapState } from "vuex";
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
  computed: {
    ...mapState("teacherInfo", {
      stage: "stage",
      subject: "subject",
      sex: "sex",
    }),
  },
  methods: {
    getTeacherList() {
      this.loading = true;
      getTeacherList(this.page).then((res) => {
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
      return this.sex[row.sex];
    },
    formatterStage(row) {
      return this.stage[row.stage];
    },
    formatterSubject(row) {
      return this.subject[row.subject];
    },
    // 修改当前条目数量
    changeSize(e) {
      this.page.pageSize = e;
      this.page.pageIndex = 1;
      this.getTeacherList();
    },
    // 修改当前页数
    changePage(e) {
      this.page.pageIndex = e;
      this.getTeacherList();
    },
    // 查找当前列表
    search() {
      this.page.pageIndex = 1;
      this.getTeacherList();
    },
    // 重置搜索条件
    clean() {
      this.page.phone = "";
      this.page.name = "";
      this.page.pageIndex = 1;
      this.getTeacherList();
    },
    changeTeacherInfo(e) {
      let index = this.tableData.findIndex((item) => item.id === e.id);
      this.tableData.splice(index, 1, e);
    },
  },
  mounted() {
    this.$bus.$off("teacherInfo");
    this.$bus.$on("teacherInfo", this.changeTeacherInfo);
    this.getTeacherList();
  },
};
</script>

<style lang="scss">
#teacher {
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
