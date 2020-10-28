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
      <el-button type="primary" @click="phoneSchoolLogin">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getSchool, phoneSchoolLogin } from "@/api/api";
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
  methods: {
    getSchool(id) {
      getSchool({ id: id }).then((res) => {
        this.schoolList = res.data;
        this.schoolActive = res.data[0].id;
      });
    },

    phoneSchoolLogin() {
      phoneSchoolLogin({ id: this.schoolActive, userId: this.userId }).then(
        (res) => {
          console.log(res.data.data)
          
          localStorage.setItem("school", JSON.stringify(res.data.data)); 
          this.$router.push({name:"Home"})
          // 确认后 调用 弹框隐藏
          this.close()
        }
      );
    },

    close() {
      // 从父中 直接用 方法  在父中 组件中 已经声明好
      this.$emit("close");
      // 判断 有没有拿到数据有没有school 后台中有证明选择学校的内容   取反 证明没有数据 不用清除   防止确认按钮调用时 清除   
      if(!localStorage.getItem("school")){
        localStorage.clear();
      }

    },
  },
  watch: {
    userId: function (newQuestion) {
      this.getSchool(newQuestion);
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
