<template>
  <div id="AnalysisType">
    <el-form ref="formRule" :model="analysisType" :rules="rules" label-width="200px">
      <el-form-item label="成绩分析名称: " prop="analyseName">
        <el-input v-model="analysisType.analyseName" placeholder="请输入成绩分析名称"></el-input>
      </el-form-item>
      <el-form-item label="学段年级: " prop="class">
        <el-select v-model="analysisType.class" placeholder="请选择学段年级" filterable>
          <el-option v-for="(item, key, index) in clas" :key="index" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入学年份: " prop="year">
        <el-select v-model="analysisType.year" placeholder="请选择入学年份" filterable>
          <el-option v-for="(item, key, index) in year" :key="index" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考试科目: " prop="subject">
        <el-select v-model="analysisType.subject" placeholder="请选择考试科目" multiple filterable>
          <el-option v-for="(item, key, index) in subject" :key="index" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考试时间: " prop="date" required>
        <el-date-picker v-model="analysisType.date" type="date" placeholder="请选择考试考试时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="分析类型：" prop="type" required>
        <el-radio-group v-model="analysisType.type">
          <el-radio-button v-for="(item, index) in type" :label="index" :key="index">{{ item }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "AnalysisType",
    props: {},
    data() {
      return {
        formRule: "formRule",
        analysisType: {
          analyseName: "",
          year: "",
          class: "",
          subject: [],
          date: "",
          type: ""
        },
        rules: {
          analyseName: [{ required: true, message: "请输入您的分析名称" }],
          year: [{ required: true, message: "请选择学段年级", trigger: "change" }],
          class: [{ required: true, message: "请选择年级", trigger: "change" }],
          subject: [{ required: true, message: "请选择任教科目", trigger: "change" }],
          date: [{ required: true, message: '请选择日期', trigger: 'change' }],
          type: [{ required: true, message: '请选择类型', trigger: 'change' }]
        }
      }
    },
    computed: {
      ...mapState("analysis", {
        clas: "class",
        year: "year",
        type: "type"
      }),
      ...mapState("teacher", {
        subject: "subject",
      }),
    },
    methods: {
      next() {
        this.submitForm()
      },
      //提交表单
      submitForm() {
        this.$refs[this.formRule].validate((valid) => {
          if (valid) {
            // this.$parent.nextBtn(true)
            // 你bus该调用了
            this.$bus.$emit('next', "true");
            sessionStorage.setItem("analysis", JSON.stringify(this.analysisType));
            this.analysisType = {}
          } else {
            this.$bus.$emit('next', 'false');
            return false;
          }
        });
      },

    },
    mounted() {
      this.analysisType = JSON.parse(sessionStorage.getItem("analysis"))
      if (!this.analysisType.a) {
        this.analysisType.subject = [...this.analysisType.subject]
      }
      this.$refs[this.formRule].resetFields();
    },
  }
</script>

<style lang="scss">
  .AnalysisType {
    padding: 60px 300px;
  }

  .el-form-item__content {
    width: 100%;
  }

  .el-input {
    width: 320px;
  }

  .el-select {
    width: 320px;
  }

  .el-date-editor.el-input {
    width: 320px;
  }
</style>