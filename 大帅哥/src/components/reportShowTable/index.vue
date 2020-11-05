<template>
  <el-dialog
    title="已选报表"
    class="_dialog"
    width="90%"
    :visible.sync="dialogVisible"
  >
    <el-table :data="tableData">
      <ColumnTable v-if="dialogVisible" :reprotColumn="reprotColumn" />
    </el-table>
  </el-dialog>
</template>

<script>
import ColumnTable from "./column_table";
export default {
  name: "ReportShowTable",
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      reprotColumn: [],
    };
  },
  components: {
    ColumnTable: ColumnTable,
  },
  methods: {
    changeDialogVisible(e) {
      this.reprotColumn = [...JSON.parse(e.json), JSON.parse(e.subjson)].filter(item => item);
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.$bus.$off();
    this.$bus.$on("reportShowTable", this.changeDialogVisible);
  },
};
</script>

<style lang="scss" scoped>
._dialog {
  ._title {
    margin: 0 auto;
    width: 381px;
  }
}
</style>
