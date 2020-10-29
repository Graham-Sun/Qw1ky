<template>
  <el-dialog :title="teacherInfo.id || teacherInfo.id === 0 ? '编辑信息' : '新增老师'" width="461px"
    class="_edit_teacher_dialog" :visible.sync="visible" :before-close="close">
    <el-form ref="formRule" :model="teacherInfo" :rules="rules" label-width="80px">
      <el-form-item label="教师姓名" prop="name">
        <el-input v-model="teacherInfo.name" placeholder="请输入您的姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="teacherInfo.phone" placeholder="请输入您的手机号"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="teacherInfo.age" placeholder="请输入您的年龄"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="teacherInfo.sex" placeholder="请选择性别">
          <el-option v-for="(item, key, index) in sex" :key="index" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学段" prop="stage">
        <el-select v-model="teacherInfo.stage" placeholder="请选择学段">
          <el-option v-for="(item, key, index) in stage" :key="index" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任教科目" prop="subject">
        <el-select v-model="teacherInfo.subject" placeholder="请选择任教科目">
          <el-option v-for="(item, key, index) in subject" :key="index" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="teacherInfo.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  // import { postSchoolRouter, getSchoolList } from "@/api/api";
  export default {
    name: "EditTeacherDialog",
    // 接受父组件传来的参数
    props: {
      stage: Object,
      subject: Object,
      sex: Object
    },
    data() {
      var rulePhone = (rule, value, callback) => {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          return callback(new Error(rule.message));
        } else {
          return callback();
        }
      };
      return {
        formRule: "formRule",
        visible: false,
        teacherInfo: {
          id: "",
          name: "",
          phone: "",
          age: "",
          sex: "",
          stage: "",
          subject: "",
          status: 0
        },
        rules: {
          name: [{ required: true, message: "请输入您的姓名" }],
          phone: [
            { required: true, message: "请输入您的手机号" },
            { validator: rulePhone, message: "请输入正确的手机号", trigger: ["blur", "change"] },
          ],
          stage: [{ required: true, message: "请选择学段", trigger: "change" }],
          subject: [{ required: true, message: "请选择任教科目", trigger: "change" }],
          status: [{ required: true, message: "请选择状态", trigger: "change" }]
        }
      }
    },
    watch: {},
    methods: {
      //父组件点击编辑时，子组件响应
      edit(e) {
        this.visible = true
        this.teacherInfo = { ...e }
      },
      //点击确认时
      submitForm() {
        this.$refs[this.formRule].validate((valid) => {
          if (valid) {
            this.change()
            this.teacherInfo = {}
            this.visible = false;
          } else {
            return false;
          }
        });
      },
      change() {
        this.$bus.$emit(
          "teacherInfo",
          JSON.parse(JSON.stringify(this.teacherInfo))
        );
        this.visible = false;
        this.$refs[this.formRule].resetFields();
      },
      //点击取消时
      close() {
        //重置表单
        this.visible = false;
        this.$refs[this.formRule].resetFields();
        this.teacherInfo = {}
      }
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