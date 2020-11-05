<template>
  <div>
    <el-table-column
      align="center"
      v-for="(item, index) in reprotColumn"
      :key="index"
      :prop="item.dataIndex"
      :label="item.title"
    >
      <ColumnTable v-if="item.children" :reprotColumn="item.children" />
    </el-table-column>
  </div>
</template>

<script>
export default {
  name: "ColumnTable",
  props: {
    reprotColumn: Array,
  },
  methods: {},
  mounted() {
    console.log(this.reprotColumn)
  },
};
</script>

<style lang="scss" scoped></style>
