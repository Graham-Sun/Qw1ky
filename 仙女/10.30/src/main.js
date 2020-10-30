import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/permission.js'
import store from "@/store"
import bus from "@/utils/bus.js"


Vue.config.productionTip = false
Vue.use(ElementUI);

// 全局注册组件
Vue.component("EditTheNewTeacher", () =>
  import("./components/edit_the_ newTeacher.vue")
);


Vue.prototype.$bus = bus; //将bus 挂载在vue的原型上
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')