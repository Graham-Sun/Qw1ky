import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "@/permission";
import store from "./store";
import bus from "@/util/bus";

Vue.use(ElementUI);
Vue.config.productionTip = false

// 全局注册组件
Vue.component("EditTeacherDialog", () =>
  import("./components/EditTeacherDialog")
);

// 4. 创建和挂载  根  实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能

Vue.prototype.$bus = bus;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')