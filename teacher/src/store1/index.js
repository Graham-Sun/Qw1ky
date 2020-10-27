import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // this.$store.state.xxx 取值，提供一个响应式数据
  state: {},
  // this.$store.getters.xxx 取值，借助Vue的计算属性computed来实现缓存
  getters: {},
  // this.$store.commit('xxx')赋值，更改state方法
  mutations: {},
  // this.$store.dispatch('xxx')赋值 不可以直接修改值，需要内部调用commit，触发mutations方法
  actions: {},
  // 模块化，Vue.set动态添加state到响应式数据中
  modules: {},
});
