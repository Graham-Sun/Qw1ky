<template>
  <div>
    <div class="header">
      <el-steps :active="active">
        <el-step title="分析类型确定"></el-step>
        <el-step title="分析成绩导入"></el-step>
        <el-step title="报表类型选择"></el-step>
        <el-step title="报表参数设置"></el-step>
      </el-steps>
    </div>
    <div class="main">
      <el-form ref="formRule" :model="analysisInfo" :rules="rules" label-width="80px">
        <el-form-item label="成绩分析" prop="analyseName">
          <el-input v-model="analysisInfo.name" placeholder="请输入成绩分析名称"></el-input>
        </el-form-item>
        <el-form-item label="学段年级" prop="stage">
          <el-select v-model="analysisInfo.stage" placeholder="请选择学段">
            <el-option v-for="(item, key, index) in stage" :key="index" :label="item" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入学年份" prop="class">
          <el-select v-model="analysisInfo.stage" placeholder="请选择年级">
            <el-option v-for="(item, key, index) in stage" :key="index" :label="item" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试科目" prop="subject">
          <el-select v-model="analysisInfo.subject" placeholder="请选择考试科目">
            <el-option v-for="(item, key, index) in subject" :key="index" :label="item" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试时间" prop="subject">
          <el-date-picker v-model="value" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-button @click="up">上一步</el-button>
      <el-button type="primary" @click="next">下一步</el-button>
    </div>


  </div>
</template>

<script>
  // import { postSchoolRouter, getSchoolList } from "@/api/api";
  export default {
    name: "analysis",
    // 接受父组件传来的参数
    props: {
      // stage: Object,
      // subject: Object
    },
    data() {
      return {
        active: 0,
        formRule: "formRule",
        analysisInfo: {
          id: "",
          name: "",
          phone: "",
          age: "",
          stage: "",
          subject: "",
          status: 0
        }
      }
    },
    watch: {},
    methods: {
      next(){
        if (this.active++ > 2){
          this.active = 4
        }
      },
      up(){
        if (this.active-- < 2){
          this.active = 0
        }
      }
    },
    mounted() {

    },
  }
</script>

<style lang="scss" scoped>
  .header {
    width: 100%;
    background: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 20px 0;
  }

  .main {
    margin-top: 20px;
    height: 582px;
    background: #fff;
    border-radius: 2px;
    padding: 60px 300px;
  }
  .el-input {
      width: 492px;
    }
    .el-select {
      width: 492px;
    }
  ._edit_analysis_dialog {
    .footer {
      text-align: center !important;
      position: relative;
      left: -40px;
    }
  }
</style>