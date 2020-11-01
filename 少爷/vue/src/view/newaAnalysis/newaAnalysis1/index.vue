<template>
  <div id="newaAnalysis1">
    <el-form
      :model="form"
      :rules="rules"
      :ref="ref"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="分析名称：" prop="name">
        <el-input v-model="form.name" placeholder="请填写分析名称"></el-input>
      </el-form-item>
      <el-form-item label="学段年级：" prop="class">
        <el-select v-model="form.class" filterable placeholder="请选择年级">
          <el-option
            v-for="(item, key, index) in cla"
            :label="item"
            :value="key"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入学年份：" prop="year">
        <el-select v-model="form.year" filterable placeholder="请选择入学年份">
          <el-option
            v-for="(item, index) in year"
            :label="`${item}年`"
            :value="item"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考试科目：" prop="subject">
        <el-select
          v-model="form.subject"
          filterable
          multiple
          placeholder="请选择考试科目"
        >
          <el-option
            v-for="(item, key, index) in subject"
            :label="item"
            :value="key"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考试时间：" prop="date">
        <el-date-picker
          type="date"
          placeholder="请选择考试时间"
          v-model="form.date"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="分析类型：" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio-button
            v-for="(item, key, index) in type"
            :label="key"
            :key="index"
            >{{ item }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "NewaAnalysis1",
  // 接受父组件传来的参数
  props: {},
  data() {
    return {
      ref: "form",
      form: {
        name: "",
        class: "",
        year: "",
        subject: "",
        date: "",
        type: "",
      },
      rules: {
        name: [{ required: true, message: "请填写分析名称", trigger: "blur" }],
        class: [{ required: true, message: "请选择年级", trigger: "change" }],
        year: [
          { required: true, message: "请选择入学年份", trigger: "change" },
        ],
        subject: [
          { required: true, message: "请选择考试科目", trigger: "change" },
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择考试时间",
            trigger: "change",
          },
        ],
        type: [
          { required: true, message: "请选择分析类型", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    ...mapState("analysis", {
      type: "type",
      cla: "class",
      year: "year",
    }),
    ...mapState("teacherInfo", {
      stage: "stage",
      subject: "subject",
    }),
  },
  methods: {
    ...mapMutations("analysis", {
      next: "next",
      back: "back",
    }),
    begin() {
      this.submitForm();
    },
    submitForm() {
      this.$refs[this.ref].validate((valid) => {
        if (valid) {
          this.next(1);
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    this.$refs[this.ref].resetFields();
  },
};
</script>

<style lang="scss">
#newaAnalysis1 {
  margin-top: 30px;
  background: #fff;
  min-height: calc(100% - 110px);
  margin-bottom: 30px;
  padding-top: 50px;
  .el-form {
    width: 600px;
    margin: 0 auto;
    .el-select {
      width: 100%;
    }
    .el-radio-group {
      width: 100%;
    }
  }
}
</style>