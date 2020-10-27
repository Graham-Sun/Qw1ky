import Vue from "vue";
import Vuex from "vuex";
import menu1 from "./modules/menu1";
import menu2 from "./modules/menu2";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  modules: {
    menu1,
    menu2,
  },
});
