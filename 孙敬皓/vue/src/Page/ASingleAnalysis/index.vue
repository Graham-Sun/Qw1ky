<template>
  <div>
    <el-button @click="reduce">减少</el-button>
    {{this.$store.state.count}}
    <el-button @click="add">增加</el-button>
  </div>
</template>

<script>
  export default {
    name: "ASingleAnalysis",
    data() {
      return {
        // count: 0
      }
    },
    //计算属性
    // mapState 辅助函数帮助我们生成计算属性
    computed: mapState({
      //三种方式写
      // 箭头函数可使代码更简练
      count: state => state.count,

      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',

      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState(state) {
        return state.count + this.localCount
      }
    }),
    methods: {
      reduce() {
        //改变 store 中的状态的唯一途径就是显式地提交 (commit)
        this.$store.commit('reduce')
      },
      add() {
        this.$store.commit('add')
      }
    },
    mounted() { }
  }
</script>

<style>

</style>