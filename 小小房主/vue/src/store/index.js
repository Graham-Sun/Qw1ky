import Vue from "vue";
import Vuex from "vuex";
import {
  teacher,
  analysis
} from './modules-type'
Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  modules: {
    teacher,
    analysis
  }
});