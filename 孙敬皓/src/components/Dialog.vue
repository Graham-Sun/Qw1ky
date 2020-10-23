<template>
  <el-dialog title="选择学校" width="461px" class="_dialog" :visible.sync="dialogVisible" :before-close="close">
    <div class="_title">
      {{
        schoolList.length > 0
          ? `当前账号已关联 ${schoolList.length}个学校，请选择登录学校`
          : `当前账号已关联 ${schoolList.length}个学校,请先加入学校`
      }}
    </div>
    <div class="_dialog_radio">
      <el-radio v-for="(item, index) in schoolList" v-model="schoolActive" :label="item.id" :key="index" border>
        {{ item.name }}</el-radio>
    </div>
    <span slot="footer" class="_dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import {
    getSchool,
    getSchoolRouter
  } from "@/api/httpApi";
  export default {
    name: "Dialog",
    props: {
      dialogVisible: Boolean,
      userId: String
    },
    data() {
      return {
        schoolList: [],
        schoolActive: "1"
      }
    },
    watch: {
      /**
       * oldQuestion表示监听目标的改变前的值
       * newQuestion表示监听目标的改变后的值
      */
      userId: function (newQuestion) {
        this.getSchoolList(newQuestion)
      }
    },
    methods: {
      //获取学校列表
      getSchoolList(id) {
        getSchool({ id: id }).then(res => {
          let { data } = res.data
          this.schoolList = data
          this.schoolActive = data.length > 0 ? data[0].id : ""
        })
      },
      //点击确定
      confirm() {
        this.postSchoolRouter()
      },
      //根据学校确定个人权限
      postSchoolRouter() {
        getSchoolRouter({
          userId: this.userId,
          id: this.schoolActive
        }).then(res => {
          localStorage.setItem("router", JSON.stringify(res.data));
          this.$router.push({
            path: "/"
          });
          this.close()
        })
      },
      //点击取消
      close() {
        this.$emit("close");
      }
    }

  }
</script>
<style lang="scss" scoped>
  ._dialog {
    ._title {
      margin: 0 auto;
      width: 381px;
    }

    ._dialog_radio {
      .el-radio {
        width: 381px;
        display: block;
        margin: 10px auto;

        .el-radio__input {
          float: right;
          margin-left: 20px;
        }
      }
    }
  }
</style>