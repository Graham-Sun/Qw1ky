// router页面配置

// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来


// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
// name跳转的时候用
const routes = [{
    path: '/',
    name: "Home",
    component: () => import("@/Page/home/index.vue"),
    // // 重定向
    redirect: "/ASingleAnalysis",
    children: [{
        // 当 /ASingleAnalysis 匹配成功，
        // ASingleAnalysis 会被渲染在 Home 的 <router-view> 中
        path: "ASingleAnalysis",
        name: "ASingleAnalysis",
        component: () => import("@/Page/ASingleAnalysis/tab/analysis.vue"),
        // redirect: {name: 'singleExcelID'},
        // children: [{
        //   path: "singleExcelID",
        //   name: "singleExcelID",
        //   component: () => import("@/Page/ASingleAnalysis/tab/analysis.vue"),
        // }]
      },
      {
        // 当 /teacherManagement 匹配成功，
        // teacherManagement 会被渲染在 Home 的 <router-view> 中
        path: "teacherManagement",
        component: () => import("@/Page/teacherManagement/index.vue"),
      },
      {
        // 当 /applicationAdmin 匹配成功，
        // applicationAdmin 会被渲染在 Home 的 <router-view> 中
        path: "applicationAdmin",
        component: () => import("@/Page/applicationAdmin/index.vue"),
      }
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/Page/login/index.vue"),
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/Page/404/index.vue")
  },
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  mode: "history",
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
//所以写到了main.js中

export default router;
// 现在，应用已经启动了！