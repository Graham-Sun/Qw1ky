import router from "./router";

// next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
// next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
// next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。

let loactionActiv = ["/", "/login"];

const loactionFn = (l) => {
  l.forEach((item) => {
    if (item.children) {
      loactionFn(item.children);
    } else {
      loactionActiv.push(item.id);
    }
  });
};

router.beforeEach((to, from, next) => {
  // 每次守卫，重置我们的路由记录，获取本地路由
  const loactionRouter = JSON.parse(localStorage.getItem("router")) || [];
  loactionActiv = ["Home", "Login", "404"];

  if (loactionRouter.length === 0) {
    // 检测用户是否完成登录流程   登录-->选择学校-->获取学校权限-->进入拥有权限的页面
    localStorage.clear();
  }

  loactionFn(loactionRouter);
  if (loactionActiv.indexOf(to.name) >= 0) {
    next();
  } else {
    router.go(-1);
  }
});

export default router;
