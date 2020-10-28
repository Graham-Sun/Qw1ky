<template>
  <div id="teacherManagement">
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
      <div class="top-r">
        <el-button class="one" icon="el-icon-refresh-right">邀请教师</el-button>
        <el-button
          class="abb"
          icon="el-icon-plus"
          @click="$refs.editTheNewTeacher.loginFlag = true"
          >新增教师</el-button
        >
      </div>
    </div>
    <el-table :data="tableData" border size="small">
      <el-table-column prop="id" label="编号" fixed="left"></el-table-column>
      <el-table-column prop="phone" label="手机号" fixed="left">
      </el-table-column>
      <el-table-column prop="name" label="教师姓名"> </el-table-column>
      <el-table-column prop="sex" label="性别" :formatter="formatterSex">
      </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>

      <el-table-column
        prop="subject"
        label="任教科目"
        :formatter="formatterSubject"
      ></el-table-column>
      <el-table-column
        prop="stage"
        label="年级/班级"
        :formatter="formatterStage"
      ></el-table-column>
      <el-table-column prop="date" label="更新时间"> </el-table-column>
      <el-table-column label="状态" :formatter="formatterStatus">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" type="danger">禁用</el-tag>
          <el-tag v-if="scope.row.status === 1" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <i
            class="el-icon-edit-outline"
            @click="$refs.editTheNewTeacher.open(scope.row)"
          />
          <i class="el-icon-delete" />
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
    <EditTheNewTeacher
      ref="editTheNewTeacher"
      :stage="stage"
      :subject="subject"
      :sex="sex"
      :status="status"
    />

    <div class="bottom">
      <div class="block">
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
    </div>
  </div>
</template>

<script>
import { getTeacherManage } from "@/api/api";
import { mapState } from "vuex";
import bus from "@/utils/bus.js";
export default {
  name: "TeacherManagement",
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
    };
  },
  computed: {
    ...mapState("EXITTEACHER", {
      stage: "stage",
      subject: "subject",
      sex: "sex",
      status: "status",
    }),
  },
  methods: {
    // 获取当前行数据，并格式化(尽量减少对原数据的修改)
    //性别
    formatterSex(row) {
      return this.sex[row.sex];
    },
    //科目
    formatterSubject(row) {
      return this.subject[row.subject];
    },
    //年级
    formatterStage(row) {
      return this.stage[row.stage];
    },
    //状态
    formatterStatus(row) {
      return this.status[row.status];
    },
    //查询
    search() {
      this.page.pageIndex = 1;
      this.page.phone = "";
      this.page.name = "";
      this.getTeacherManage();
    },
    //切换每页的数据条目
    sizeChange(val) {
      this.page.pageSize = val;
      this.page.pageIndex = 1;
      this.getTeacherManage();
    },
    //更改当前页
    indexChange(val) {
      console.log(val);
      this.page.pageIndex = val;
      this.getTeacherManage();
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
    getTeacherManage() {
      this.loading = true;
      getTeacherManage(this.page).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.num;
      });
    },
    changeTeacherInfo(e) {
      console.log(e);
      let index = this.tableData.findIndex((item) => {
        // console.log(item,e);
        return item.id === e.id;
      });
      this.tableData.splice(index, 1, e);
    },
  },

  mounted() {
    bus.$on("teacherInfo", this.changeTeacherInfo);
    this.getTeacherManage();
  },
};
</script>

<style lang="scss">
#teacherManagement {
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
    .top-r {
      position: absolute;
      top: 18px;
      right: 10px;

      .one {
        background-color: #fff;
        color: #17c7bb;
      }
      .abb {
        background: #1dbd84;
        color: #fff;
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
</style>