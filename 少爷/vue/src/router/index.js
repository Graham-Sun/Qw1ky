import Vue from "vue";
import VueRouter from "vue-router";
// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(VueRouter);

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
// name跳转的时候用
const routes = [{
    id: "/",
    path: "/",
    name: "Home",
    component: () => import("@/view/home/index.vue"),
    children: [{
        // 当 /menu1 匹配成功，
        // menu1 会被渲染在 Home 的 <router-view> 中
        id: "/singleAnalysis",
        path: "singleAnalysis",
        name: "singleAnalysis",
        redirect:"/singleAnalysis/analysisList",
        component: () => import("@/view/singleAnalysis/index.vue"),
        children: [
          {
            id: "/analysisList",
            path: "analysisList",
            name: "singleAnalysis_analysisList",
            component: () => import("@/view/analysisList/index.vue"),
          },
          {
            id: "/newaAnalysis",
            path: "newaAnalysis",
            name: "singleAnalysis_newaAnalysis",
            component: () => import("@/view/newaAnalysis/index.vue"),
          },
        ],
      },
      {
        // 当 /menu2 匹配成功，
        // menu2 会被渲染在 Home 的 <router-view> 中
        id: "/teacherManagement",
        path: "teacherManagement",
        name: "teacherManagement",
        component: () => import("@/view/teacherManagement/index.vue"),
      },
      {
        id: "/applicationAdmin",
        path: "applicationAdmin",
        name: "applicationAdmin",
        component: () => import("@/view/applicationAdmin/index.vue"),
      },
    ],
  },
  {
    id: "/login",
    path: "/login",
    name: "Login",
    component: () => import("@/view/login/index.vue"),
  },
  {
    id: "*",
    path: "*",
    name: "404",
    component: () => import("@/view/404/index.vue")
  },
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  mode: "history",
  routes, // (缩写) 相当于 routes: routes
});

export default router;