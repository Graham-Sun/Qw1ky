<template>
  <el-dialog
    :title="teacherInfo.id || teacherInfo.id === 0 ? '编辑信息' : '新增老师'"
    width="461px"
    class="_edit_teacher_dialog"
    :visible.sync="visible"
    :before-close="cancel"
  >
    <el-form ref="form" :rules="rules" :model="teacherInfo" label-width="80px">
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
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="ok">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "AddSchool",
  props: {
    stage: Object,
    subject: Object,
    sex: Object,
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
      teacherInfo: {},
      visible: false,
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

  methods: {
    open(e) {
      this.visible = true;
      console.log(e);
      this.teacherInfo = e;
    },
    //取消按钮
    cancel() {
      this.visible = false;
      this.teacherInfo = [];
    },
    // 确认按钮
    ok() {
      this.visible = false;
      this.teacherInfo = [];
      // console.log(this.teacherInfo);
    },
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