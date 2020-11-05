<template>
  <el-dialog
    title="已选报表"
    width="661px"
    class="_dialog"
    :visible.sync="dialogVisible"
  >
    <el-table :data="tableList" style="width: 100%" border size="mini">
      <el-table-column prop="no" label="报表编号"> </el-table-column>
      <el-table-column prop="name" label="报表名称"> </el-table-column>
      <el-table-column prop="type" label="报表类型"> </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <i class="el-icon-delete" @click="scope.row.falg = false"></i>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: "ReportTable",
  props: {
    showList: Array,
  },
  data() {
    return {
      dialogVisible: false,
      type: "",
    };
  },
  computed: {
    tableList() {
      return this.showList.filter(
        (item) => item.type === this.type && item.falg
      );
    },
  },
  methods: {
    changeDialogVisible(e) {
      this.type = e;
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.$bus.$off();
    this.$bus.$on("changeDialogVisible", this.changeDialogVisible);
  },
};
</script>

<style lang="scss" scoped>
._dialog {
  ._title {
    margin: 0 auto;
    width: 381px;
  }
  .el-icon-delete {
    font-size: 16px;
    color: #1dbd84;
    margin: 0 10px;
    cursor: pointer;
  }
}
</style>
