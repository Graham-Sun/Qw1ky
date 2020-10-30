<template>
  <div id="aSingleType">
    <el-form
      :model="tableData"
      :rules="rules"
      :ref="ref"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="分析名称：" prop="grade">
        <el-input
          v-model="tableData.grade"
          placeholder="请填写分析名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="学段年级：" prop="class">
        <el-select
          v-model="tableData.class"
          filterable
          placeholder="请选择年级"
        >
          <el-option
            v-for="(item, key, index) in schoolClass"
            :label="item"
            :value="key"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入学年份：" prop="year">
        <el-select
          v-model="tableData.year"
          filterable
          placeholder="请选择入学年份"
        >
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
          v-model="tableData.subject"
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
          v-model="tableData.date"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="分析类型：" prop="type">
        <el-radio-group v-model="tableData.type">
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
import { mapState } from "vuex";
export default {
  name: "ASingleType",
  data() {
    return {
      ref: "form",
      active: 0,
      tableData: {
        grade: "",
        class: "",
        year: "",
        subject: "",
        date: "",
        type: "",
      },
      rules: {
        grade: [{ required: true, message: "请填写分析名称", trigger: "blur" }],
        class: [{ required: true, message: "请选择年级", trigger: "change" }],
        year: [
          { required: true, message: "请选择入学年份", trigger: "change" },
        ],
        subject: [
          { required: true, message: "请选择考试科目", trigger: "change" },
        ],
        date: [
          {
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
    ...mapState("EXITTEACHER", {
      stage: "stage",
      subject: "subject",
    }),
    ...mapState("ASINGLE", {
      schoolClass: "class",
      year: "year",
      status: "status",
      type: "type",
    }),
  },
  methods: {
    begin(active) {
      return this.submitForm(active);
    },
    submitForm(active) {
      this.$refs[this.ref].validate((valid) => {
        if (valid) {
          active += 1;
          if (!sessionStorage.getItem("row")) {
            this.tableData.step = active;
            sessionStorage.setItem(
              "createData",
              JSON.stringify(this.tableData)
            );
          }
        }
      });
      return active; //将传过来的参数 返回出去
    },
    resetForm() {
      this.$refs[this.ref].resetFields();
    },
    //获取本地数据
    storage() {
      if (sessionStorage.getItem("createData")) {
        let createData = JSON.parse(sessionStorage.getItem("createData"));
        this.tableData = createData;
      } else if (sessionStorage.getItem("row")) {
        let data = JSON.parse(sessionStorage.getItem("row"));
        this.tableData = data;
        this.tableData.subject = [...this.tableData.subject];
        return;
      }
    },
  },
  mounted() {
    this.storage();
    this.$refs[this.ref].resetFields();
  },
};
</script>

<style lang="scss">
#aSingleType {
  background: #fff;
  min-height: calc(100% - 110px);
  margin-bottom: 30px;
  padding-top: 60px;
  box-sizing: border-box;
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