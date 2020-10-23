<template>
  <el-dialog
    title="选择学校"
    width="461px"
    class="_dialog"
    :visible.sync="dialogVisible"
  >
    <div class="_title">
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
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="postSchoolRouter">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { postSchoolRouter, getSchoolList } from "@/api/api";
export default {
  name: "Dialog",
  // 接受父组件传来的参数
  props: {
    dialogVisible: Boolean,
    userId: String,
  },
  data() {
    return {
      schoolActive: "1",
      schoolList: [],
    };
  },
  watch: {
    userId: function(newQuestion) {
      this.getSchoolList(newQuestion);
    },
  },
  methods: {
    // 获取学校列表
    getSchoolList(id) {
      getSchoolList({ id: id }).then((res) => {
        let { data } = res;
        this.schoolList = data;
        this.schoolActive = data.length > 0 ? res.data[0].id : "";
      });
    },
    // 确认登录
    postSchoolRouter() {
      postSchoolRouter({
        userId: this.userId,
        id: this.schoolActive,
      }).then((res) => {
        localStorage.setItem("router", JSON.stringify(res.data));
        // params会受到重定向（redirect）的影响， login---->Home--->menu1
        this.$router.push({ name: "Home" });
        this.close()
      });
    },
    // 关闭弹层
    close() {
      this.$emit("close");
    },
  },
};
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
