<template>
  <el-dialog
    :title="teacherInfo.id || teacherInfo.id === 0 ? '编辑信息' : '新增老师'"
    width="461px"
    class="_edit_teacher_dialog"
    :visible.sync="visible"
    :before-close="close"
  >
    <el-form ref="box" :model="teacherInfo" :rules="rules" label-width="80px">
      <el-form-item label="姓名" prop="name">
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
      <el-form-item label="性别">
        <el-select v-model="teacherInfo.sex" placeholder="请选择性别">
          <el-option
            v-for="(item, key, index) in sex"
            :key="index"
            :label="item"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="teacherInfo.status" >
          <el-radio :label='1'>正常</el-radio>
          <el-radio :label='0'>禁用</el-radio>
        </el-radio-group>
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
      <el-form-item class="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="setForm('form')">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "TeacherDialog",
  // 接受父组件传来的参数
  props: {
    stage: Object,
    subject: Object,
    sex: Object
  },
  data() {
    //输入手机号正则
    var rulePhone = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error(rule.message));
      } else {
        return callback();
      }
    };
    return {
      teacherInfo: {
        id: "",
        name: "",
        phone: "",
        age: "",
        sex: "",
        stage: "",
        subject: "",
        status:"",
      },
      //Dialog开关
      visible: false,
      //表单验证规则
      rules: {
        name: [{ required: true, message: "请输入您的姓名" }],
        phone: [
          { required: true, message: "请输入您的手机号" },
          {
            validator: rulePhone,
            message: "请输入正确的手机号",
            trigger: ["blur", "change"],
          },
        ],
        stage: [{ required: true, message: "请选择学段", trigger: "change" }],
        subject: [
          {
            required: true,
            message: "请选择任教科目",
            trigger: "change",
          },
        ],
      },
    };
  },
  watch: {},
  methods: {
    //点击编辑
    edit(e) {
      this.visible = true;
      this.teacherInfo = { ...e };
      console.log(this.teacherInfo);
      console.log(this.teacherInfo.status);
    },
    //点击确定
    setForm(ref) {
      this.$refs[ref].validate((boolean, object) => {
        if (boolean) {
          this.change();
        }
      });
    },
    //改变教师信息
    change() {
      this.$bus.$emit(
        "teacherInfo",
        JSON.parse(JSON.stringify(this.teacherInfo))
      );
      this.teacherInfo = {
        id: "",
      };
      this.visible = false;
      this.$refs["box"].resetFields();
    },
    //点击取消
    close() {
      this.$refs["box"].resetFields();
      this.visible = false;
      this.teacherInfo = {
        id: "",
      };
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
._edit_teacher_dialog {
  .el-select {
    width: 100%;
  }
  .footer {
    text-align: center !important;
    position: relative;
    left: -40px;
  }
}
</style>
