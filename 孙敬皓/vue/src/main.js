import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "@/permission";
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    reduce(state) {
      state.count--
    },
    add(state) {
      state.count++
    },
  }
})

// 4. 创建和挂载  根  实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')