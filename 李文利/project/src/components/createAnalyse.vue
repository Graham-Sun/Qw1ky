<template>
  <div id="createAnalyse">
    <div class="header">
      <el-steps :active="active" finish-status="success" simple>
        <el-step title="分析类型确定"></el-step>
        <el-step title="分数成绩导入"></el-step>
        <el-step title="报表类型选择"></el-step>
        <el-step title="报表参数设置"></el-step>
      </el-steps>
    </div>
    <div class="main">
     
     
    </div>
    <div class="footer">
      <el-button class="btn" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateAnalyse",
  data() {
    return {
      active: 0,
    };
  },

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
#createAnalyse {
  width: 100%;
  height: 100%;
  .header {
    background: #fff;
    height: 50px;

    .el-steps {
      width: 100%;
      height: 50px;
      line-height: 50px;
    }
  }

  .footer {
    width: 100%;
    height: 80px;
    position: fixed;
    right: 0px;
    bottom: 60px;
    background: #fff;
    .btn {
      position: fixed;
      right: 50px;
      bottom: 80px;
      margin-top: 12px;
    }
  }
}
</style>