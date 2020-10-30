<template>
  <!-- before-close 仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效。
如果你在 footer 具名 slot 里添加了用于关闭 Dialog 的按钮，
那么可以在按钮的点击回调函数里加入 before-close 的相关逻辑。
说白了就是 ，当我在单击dialog任意地方时，都给他进行一个teacherInfo进行一个清空，这样当我们在单击新增教师进来时，就没有数据了
            当我们单击编辑按钮时， 不用担心里面没有数据 ，因为当我们单击编辑是，就已经传入了当前行的数据 -->
  <!-- teacherInfo.id || teacherInfo.id === 0 ? '编辑教师' : '新增教师'
              当id存在的是时候 就证明我们单击的是编辑按钮，所以显示编辑的title,反之则是新增按钮
              因为当id:0时 会默认返回false的结果，所以此时我们要将id：0的结果也写出来 id全等为0时 也是真的情况
             -->
  <el-dialog
    :title="teacherInfo.id || teacherInfo.id === 0 ? '编辑教师' : '新增教师'"
    width="461px"
    class="_dialog"
    :visible.sync="loginFlag"
    :before-close="closeDialog"
  >
    <el-form ref="form" :model="teacherInfo" :rules="rules" label-width="80px">
      <el-form-item label="教师姓名" prop="name">
        <el-input
          v-model="teacherInfo.name"
          placeholder="请输入您的姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="teacherInfo.phone"
          placeholder="请输入您的手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input
          v-model="teacherInfo.age"
          placeholder="请输入您的年龄"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="teacherInfo.sex" placeholder="请选择性别">
          <el-option
            v-for="(item, key, index) in sex"
            :key="index"
            :label="item"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学段" prop="stage">
        <el-select v-model="teacherInfo.stage" placeholder="请选择学段">
          <el-option
            v-for="(item, key, index) in stage"
            :key="index"
            :label="item"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任教科目" prop="subject">
        <el-select v-model="teacherInfo.subject" placeholder="请选择任教科目">
          <el-option
            v-for="(item, key, index) in subject"
            :key="index"
            :label="item"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="teacherInfo.status">
          <!-- <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio> -->
          <el-radio
            v-for="(item, key, index) in status"
            :key="index"
            :label="Number(key)"
            >{{ item }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item class="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="getSchoolRouter('form')"
          >确 定</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import bus from "@/utils/bus.js";
import { _str, _obj } from "@/utils/collection.js";
export default {
  name: "Dialog",
  props: {
    stage: Object,
    sex: Object,
    subject: Object,
    status: Object,
  },
  data() {
    return {
      loginFlag: false,
      teacherInfo: {
        id: "",
        name: "",
        age: "",
        sex: "",
        subject: "",
        stage: "",
        phone: "",
      },
      rules: {
        name: [{ required: true, message: "请输入教师姓名", trigger: "blur" }],
        phone: [
          {
            type: "number",
            transform(value) {
              if (/^1[3456789]\d{9}$/.test(value)) {
                return Number(value);
              }
            },
            required: true,
            message: "请输入手机号",
            trigger: ["blur", "change"],
          },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        stage: [{ required: true, message: "请选择学段", trigger: "change" }],
        subject: [
          { required: true, message: "请选择任教科目", trigger: "change" },
        ],
        status: [
          { required: true, message: "请选择当前状态", trigger: "change" },
        ],
      },
    };
  },

  methods: {
    //编辑
    open(e) {
      this.loginFlag = true;
      //e为当前这条数据+ 由父组件传过来的参数
      this.teacherInfo = { ...e };
    },
    //取消 当单击取消按钮时，给Teacher 置空 因为我们在单击新增教师按钮时 里面是没有数据的
    closeDialog() {
      this.loginFlag = false;
      this.teacherInfo = {};
      this.$refs["form"].resetFields(); //关闭校验
    },
    //确定 当单击取消按钮时，也要给Teacher 置空 因为我们在再次单击新增教师按钮时 里面也是没有数据的,
    //新增数据点击确认==>请求接口==>关闭校验提示
    getSchoolRouter(ref) {
      console.log(this.$refs[ref])
      //validate 当单击确定按钮是重新校验 所有的输入是否符合 
      this.$refs[ref].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.getList(ref);
        } else {
          return false;
        }
      });
    },
    //接口数据
    getList(ref) {
      setTimeout(() => {
        //这里会调用接口之类 而置空和隐藏弹框需要在调用接口是关闭和清空 （现在还不能使用）
        //父子组件交互  传的参数一定要进行深拷贝否则传过去的，因为我们在父子交互时修改数据，每次修改了数据都会重新请求接口
        //但是我们目前还不能通过页面修改接口数据，所以我们传过去的数据没有进行深拷贝的话，修改后的与没有修改之前的数据的内存地址是一样的
        //我们只是修改了页面上的表面数据，此时如果希望页面上的数据改变 我们就需要深拷贝当前修改的数据，改变他的内存地址后，在通过父子交互传参传过去
        //那我们修改的数据就可以在页面上展示出来了
        bus.$emit("teacherInfo", _obj(_str(this.teacherInfo)));
        this.loginFlag = false;
        this.teacherInfo = {};
        this.$refs[ref].resetFields(); //关闭校验
      }, 150);
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
  .el-select {
    width: 100%;
  }
  .el-radio-group {
    margin-left: -195px;
  }
  .footer {
    margin-left: -60px !important;
  }
}
</style>