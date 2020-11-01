<template>
  <div id="apply" v-loading="loading">
    <div class="header">
      <div class="left">
        成绩分析名称: <el-input placeholder="请输入成绩分析名称" v-model="page.analyseName" clearable size="mini" class="input">
        </el-input>
        状态: <el-select size="small" v-model="page.status" filterable placeholder="请选择状态">
          <el-option label="参数设置" :value="0"></el-option>
          <el-option label="分析完成" :value="1"></el-option>
        </el-select>
        <el-button class="btn" type="success" size="small" @click="search">
          查询
        </el-button>
        <el-button class="btn" type="success" size="small" @click="clear">
          重置
        </el-button>
      </div>
      <div class="right">
        <el-button class="btn" type="success" icon="el-icon-plus" size="small" @click="setting">
          新增分析
        </el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%;" :row-class-name="tableRowClassName" size="mini">
        <el-table-column prop="id" label="编号"">
        </el-table-column>
        <el-table-column prop=" analyseName" label="成绩分析名称">
        </el-table-column>
        <el-table-column prop="stage" label="学段" :formatter="(row) => this.stage[row.stage]">
        </el-table-column>
        <el-table-column prop="class" label="年级" :formatter="(row) => this.class[row.class]">
        </el-table-column>
        <el-table-column prop="year" label="入学年份" :formatter="(row) => `${row.year}年`">
        </el-table-column>
        <el-table-column prop="date" label="考试时间">
        </el-table-column>
        <el-table-column prop="type" label="分析类型" :formatter="(row) => this.type[row.type]">
        </el-table-column>
        <el-table-column prop="name" label="创建人">
        </el-table-column>
        <el-table-column prop="date" label="创建时间">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag class="tag" v-show="scope.row.status === 0" effect="dark" @click="setting(scope.row)">参数设置
            </el-tag>
            <el-tag class="tag" v-show="scope.row.status === 1" type="success" effect="dark">分析完成</el-tag>
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
  import { getASingleAnalysis } from "@/api/httpApi";
  import { mapState } from 'vuex';
  export default {
    name: "analysisList",
    data() {
      return {
        visible: false,
        page: {
          pageIndex: 1,
          pageSize: 10,
          analyseName: "",
          type: "",
          status: ""
        },
        tableData: [],
        total: 0,
        loading: true
      }
    },
    computed: {
      ...mapState('analysis', {
        class: "class",
        type: "type"
      }),
      ...mapState('teacher', {
        stage: "stage",
        subject: "subject"
      })
    },
    methods: {
      //参数设置
      setting(row) {
        //点新增分析的时候不需传参所以设定默认值
        if (row.subject) {
          sessionStorage.setItem("analysis", JSON.stringify(row));
          this.$router.push({ name: "ASingleAnalysis_singleExcel" })
        } else {
          let analysis = { a: 'aa', step: "0" }
          sessionStorage.setItem("analysis", JSON.stringify(analysis));
          this.$router.push({ name: "ASingleAnalysis_singleExcel" })
        }
      },
      //请求页面数据
      getASingleAnalysis() {
        getASingleAnalysis(this.page).then(res => {
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
      //使页面展示数目改变时
      handleSizeChange(e) {
        this.page = {
          pageIndex: 1,
          pageSize: e
        }
        this.getASingleAnalysis()
      },
      //当点击页码  改变时
      handleCurrentChange(e) {
        this.page.pageIndex = e
        this.getASingleAnalysis()
      },
      //点击查询按钮
      search() {
        this.page.pageIndex = 1
        this.getASingleAnalysis();
      },
      //点击重置按钮
      clear() {
        this.page = {
          pageIndex: 1,
          pageSize: 10,
          analyseName: "",
          type: "",
          status: ""
        },
          this.getASingleAnalysis();
      }
    },
    mounted: function () {
      this.getASingleAnalysis()
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

    .tag {
      cursor: pointer;
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