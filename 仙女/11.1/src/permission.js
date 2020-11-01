import router from '@/router'
import {
    _obj
} from "@/utils/collection.js"
let locationActive = ["Home", "Login", 'Error'];
const locationRouter = (r) => {
    r.forEach((item) => {
        if (item.children) {
            locationRouter(item.children)
        } else {
            locationActive.push(item.id)
        }
    })
}
/**
to: Route: 即将要进入的目标 路由对象
from: Route: 当前导航正要离开的路由
next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
*
next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
*/
router.beforeEach((to, from, next) => {
    //to -->去哪  from -->来自哪
    // console.log(to.path, from.path)
    let routers = _obj(localStorage.getItem("router")) || [];
    locationActive = ["Home", "Login", 'Error'];
    locationRouter(routers)
    // console.log(locationActive)
    if (routers.length === 0) {
        //判断用户是否完成了登录，如果没有则清除本地存储的内容 
        /*
        当用户点击登录按钮后，（我们已经将用户的信息存储在了本地）-->
            1.此时弹框出来，用户没有点确定，按了取消的时候，我们就要清除本地存储
            2.如果不清楚本地存储 当我们刷新页面的时候 我们就进入到了程序里面，这时不符合的，所以 当用户没有选择学校或者取消选择的是偶
            我们都要将本地存储清空
        */
        localStorage.clear();
    }
    // console.log(to)
    if (locationActive.indexOf(to.name.split("_")[0]) >= 0) {
        next()
    } else {
        router.go(-1)
    }
})

export default router