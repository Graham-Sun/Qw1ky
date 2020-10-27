import VueRouter from 'vue-router';
import Vue from 'vue'


Vue.use(VueRouter)
// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
// import home from '@/view/home/home.vue'
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)


// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [{
        path: "/",
        name: "Home",
        component: () => import('@/view/home/home.vue'),
        children: [{
                path: 'mark1',
                component: () => import('@/view/mark-one/index.vue'),
            },
            {
                path: 'school1',
                component: () => import('@/view/school-one/index.vue'),
            }, {
                path: 'apply',
                component: () => import('@/view/apply/index.vue'),
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/view/login/login.vue'),
    },
    // {
    //     path: '*',
    //     name: 'Error',
    //     component: () => import('@/view/404/index.vue'),
    // },
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    mode: 'history', //默认 哈希   改掉 路径中的 ＃号
    routes // (缩写) 相当于 routes: routes
})

export default router