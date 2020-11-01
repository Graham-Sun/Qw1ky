<template>
  <el-dialog
    title="选择学校"
    width="461px"
    class="_dialog"
    :visible.sync="loginFlag"
  >
    <div class="_title">
      当前账号已关联
      {{
        schoolList.length > 0
          ? `当前账号已关联 ${schoolList.length}个学校，请选择登录学校`
          : `当前账号已关联 ${schoolList.length}个学校,请先加入学校`
      }}
    </div>
    <div class="_dialog_radio">
      <el-radio
        v-for="(item, index) in schoolList"
        v-model="schoolActive"
        :label="item.id"
        :key="index"
        border
        >{{ item.name }}</el-radio
      >
    </div>
    <span slot="footer" class="_dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="getSchoolRouter">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getSchoolList, getSchoolRouter } from "@/api/api";
import { _str } from "@/utils/collection";

export default {
  name: "Dialog",
  props: {
    loginFlag: Boolean,
    accountId: String,
  },
  data() {
    return {
      schoolActive: "1",
      schoolList: [],
    };
  },
  watch: {
    accountId: function (newQuestion) {
      //   console.log(newQuestion); //由父页面传过来的参数accountId且每次改变
      this.getSchoolList(newQuestion); //watch都会监听到，newQuestion的改变 mounted只可以监听到首次进入的操作
    },
  },
  methods: {
    //获取学校列表
    getSchoolList(id) {
      getSchoolList({ id: id }).then((res) => {
        let { data } = res;
        this.schoolList = data;
        this.schoolActive = data.length > 0 ? data[0].id : ""; //得到数据中默认选中的学校
      });
    },
    //获取权限（确定）
    getSchoolRouter() {
      getSchoolRouter({
        userId: this.accountId,
        id: this.schoolActive,
      }).then((res) => {
        localStorage.setItem("router", _str(res.data.data));
        this.$router.push({ path: "/" });
        this.$emit("closeDialog");
      });
    },
    //取消
    closeDialog() {
      this.$emit("closeDialog");
      if (!localStorage.getItem("router")) {
        localStorage.clear();
      }
    },
  },

  mounted() {},
};
</script>

<style lang="scss" scoped>
//在组件中如果写了节点的样式记住要加上scoped,因为这样不会污染全局页面的样式
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