<template>
  <div class="box" v-loading="loading">
    <div class="top">
      手机号码:<el-input placeholder="请输入内容"></el-input> 姓名:<el-input
        placeholder="请输入内容"
      ></el-input>
      <el-button>查询</el-button>
      <div class="right">
        <el-button class="btn_share" type="success" size="small">
          <i class="el-icon-time"></i>
          邀请教师
        </el-button>
        <el-button
          class="btn_add"
          type="success"
          size="small"
          @click="$refs.TeacherInfo.visible = true"
        >
          <i class="el-icon-plus"></i>
          新增教师
        </el-button>
      </div>
    </div>

    <div class="content">
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="phone" label="手机号"> </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column
            prop="stage"
            label="学段"
            :formatter="formatterStage"
          >
          </el-table-column>
          <el-table-column
            prop="subject"
            label="任教科目"
            :formatter="formatterSubject"
          ></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            :formatter="formatter"
          ></el-table-column>
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
                class="el-icon-edit-outline icon"
                @click="$refs.TeacherInfo.edit(scope.row)"
              ></i>
                        
              <i class="el-icon-delete-solid icon"></i>
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
        <TeacherDialog
          ref="TeacherInfo"
          :stage="stage"
          :subject="subject"
          :sex="sex"
          :states="states"
        />
      </div>
    </div>
  </div>
</template>

 <script>
import { getTClist } from "../../api/api";
import { mapState } from "vuex";
export default {
  name: "teacherManagement",
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 10,
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
      states: "states",
    }),
  },
  methods: {
    // 获取页面数据
    getTClist() {
      this.loading = true;
      getTClist(this.page).then((res) => {
        let { data } = res;
        this.tableData = data.list;
        // console.log(data.list);
        this.total = data.num;
        this.loading = false;
      });
    },
    // 获取当前行数据，并格式化(尽量减少对原数据的修改)
    formatter(row) {
      return row.sex ? "男" : "女";
    },
    //学段
    formatterStage(row) {
      return this.stage[row.stage];
    },
    //任教科目
    formatterSubject(row) {
      return this.subject[row.subject];
    },
    //状态
    formatterStates(row) {
      return this.stated[row.states];
      console.log(row);
    },
    // 修改当前条目
    changeSize(e) {
      this.page.pageSize = e;
      this.page.pageIndex = 1; //更改条目 也将页码重置
      this.getTClist();
    },
    // 修改当前页数
    changePage(e) {
      this.page.pageIndex = e;
      this.getTClist();
    },
    //改变教师的个人信息
    changeTeacherInfo(e) {
      let index = this.tableData.findIndex((item) => item.id === e.id);
      this.tableData.splice(index, 1, e);
    },
  },
  mounted() {
    this.$bus.$off("teacherInfo");
    this.$bus.$on("teacherInfo", this.changeTeacherInfo);
    this.getTClist();
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
      cursor: pointer;
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