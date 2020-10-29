import Vue from "vue";
import Vuex from "vuex";
import teacherInfo from "./modules/teacherInfo";
import analysis from "./modules/analysis";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  modules: {
    teacherInfo,
    analysis
  },
});
