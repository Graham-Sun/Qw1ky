import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import store from "./store";
import router from "./router/index"
import routers from './promission'


Vue.config.productionTip = false
Vue.use(ElementUI);



// 4. 创建和挂载根实例。 
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能

// 全局注册组件      一般不会 在全局写  这样写 会让每个页面都附加上 一段代码 性能变差
Vue.component("AddSchool", () =>
  import("./components/add_teacher")
);


new Vue({
  router,
  routers,
  store,
  render: h => h(App),
}).$mount('#app')