import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from "./router/index"
import routers from './promission'


Vue.config.productionTip = false
Vue.use(ElementUI);



// 4. 创建和挂载根实例。 
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能

new Vue({
  router,
  routers,
  render: h => h(App),
}).$mount('#app')