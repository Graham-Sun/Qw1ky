import Vue from 'vue'
import VueRouter from 'vue-router'
// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(VueRouter)
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [{
        path: '/',
        name: "Home",
        id: "/",
        component: () => import("@/view/home/index.vue"),
        children: [{
                id: "/aSingleAnalysis",
                path: '/aSingleAnalysis',
                name: "ASingleAnalysis",
                component: () => import("@/view/aSingleAnalysis/index.vue"),
                // children: [{
                //     id: "/createAnalyse",
                //     path: '/createAnalyse',
                //     name: "CreateAnalyse",
                //     component: () => import("@/view/createAnalyse/index.vue"),
                // }]
            },
            {
                id: "/teacherManagement",
                path: '/teacherManagement',
                name: "TeacherManagement",
                component: () => import("@/view/teacherManagement/index.vue")
            },
            {
                id: "/applicationManagement",
                path: '/applicationManagement',
                name: "ApplicationManagement",
                component: () => import("@/view/applicationManagement/index.vue")
            },
            {
                id: "/four",
                path: '/four',
                name: "Four",
                component: () => import("@/view/four/index.vue")
            }
        ]
    },
    {
        id: "/login",
        path: '/login',
        name: "Login",
        component: () => import("@/view/login/index.vue")
    },
    {
        id: "/*",
        path: '*',
        name: "Error",
        component: () => import("@/view/four/index.vue")
    }
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    mode: "history",
    routes,
})


export default router;