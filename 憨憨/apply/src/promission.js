import router from './router/index'
let newarr = ['/', '/login']
function getarr(data) {
    data.forEach(ele => {
        if (ele.children) {
            getarr(ele.children)
        } else {
            newarr.push(ele.path)
        }
    });
}
// 全局前置守卫
// to 即将要进入的目标 路由对象
// from 当前导航正要离开的路由
// next 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数
router.beforeEach((to, from, next) => {
    const routers = JSON.parse(localStorage.getItem("school")) || [];
    newarr = ['/', '/login']
    getarr(routers)
    if (routers.length === 0) {
        localStorage.clear();
    }
    if (newarr.indexOf(to.path) >= 0) {
        next()
    } else {
        // next({path:from.path})
        router.go(-1)
    }
})


export default router