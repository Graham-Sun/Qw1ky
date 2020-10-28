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
        <el-button @click="aaa" class="abtn" type="success" icon="el-icon-time" size="small">
          邀请教师
        </el-button>
        <el-button class="btn" type="success" icon="el-icon-plus" size="small"
          @click="$refs.editTeacherInfo.visible = true">
          新增教师
        </el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%;" :row-class-name="tableRowClassName" size="mini">
        <el-table-column prop="id" label="编号"">
        </el-table-column>
        <el-table-column prop= "phone" label="手机号码">
        </el-table-column>
        <el-table-column prop="name" label="教师姓名">
        </el-table-column>
        <el-table-column prop="stage" label="学段" :formatter="formatterStage">
        </el-table-column>
        <el-table-column prop="subject" label="任教科目" :formatter="formatterSubject">
        </el-table-column>
        <el-table-column prop="sex" label="性别" :formatter="formatterSex">
        </el-table-column>
        <el-table-column prop="date" label="更新时间">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.status === 0" type="danger">禁用</el-tag>
            <el-tag v-show="scope.row.status === 1" type="success">正常</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i class="el-icon-edit-outline" @click="$refs.editTeacherInfo.edit(scope.row)"></i>
            <i class="el-icon-delete-solid"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination class="page" background @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="page.pageIndex" :page-sizes="[5, 10]" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <EditTeacherDialog ref="editTeacherInfo" :stage="stage" :subject="subject" :sex="sex" />
  </div>

</template>

<script>
  import { getTeacherApply } from "@/api/httpApi";
  import { mapState } from 'vuex';
  export default {
    name: "applicationAdmin",
    data() {
      return {
        visible: false,
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
    computed: {
      ...mapState('teacher', {
        stage: "stage",
        subject: "subject",
        sex: "sex"
      })
    },
    methods: {
      aaa() {
        // console.log(this.$refs);
        // console.log(this.stage,this.subject,this.sex);
      },
      //请求页面数据
      getTeacherApply() {
        getTeacherApply(this.page).then(res => {
          let { data } = res
          this.tableData = data.data.list
          this.total = data.data.num
          this.loading = false
        })
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
      //获取当前行数据，并格式化(尽量减少对原数据的修改)
      formatterSex(row) {
        return this.sex[row.sex]
      },
      formatterStage(row) {
        return this.stage[row.stage]
      },
      formatterSubject(row) {
        return this.subject[row.subject]
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
      },
      //改变页面数据
      changeTeacherInfo(e) {
        let index = this.tableData.findIndex(item => item.id === e.id)
        this.tableData.splice(index, 1, e);
      }
    },
    mounted: function () {
      this.$bus.$off("teacherInfo");
      this.$bus.$on("teacherInfo", this.changeTeacherInfo);
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

    .el-icon-edit-outline,
    .el-icon-delete-solid {
      font-size: 16px;
      color: #1dbd84;
      margin: 0 10px;
      cursor: pointer;
    }

    .el-icon-delete-solid {
      color: #d54141;
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