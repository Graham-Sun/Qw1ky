<template>
  <div>
    <template v-for="(item, index) in router">
      <el-submenu v-if="item.children" :index="item.name" :key="index">
        <!-- 如果item.children存在 就拿到item中的name 渲染到页面 这一步指的是组件（集合）的父亲-->
        <template slot="title">
          <i class="el-icon-s-marketing"></i>
          <span>{{ item.name }}</span>
        </template>
        <!-- 递归算法：函数调用函数自身 -->
        <!-- 当再次调用自己的时候 到if判断时，去判断当前的item.children中还有没有children,
        如果有就接着渲染组件集合的父亲，如果没有就直接渲染路由页面的名称 -->
        <SubMenu :router="item.children" />
      </el-submenu>
      <!-- 如果item.children不存在 就拿到item中的path路由 渲染到页面 并且拿到当前路由页面的名称 这一步指的是可以跳转到不同页面-->
      <el-menu-item v-else :key="index" :index="item.path">{{
        item.name
      }}</el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "SubMenu",
  // 接受父组件传来的参数
  props: { router: Array },
  data() {
    return {};
  },
  mounted: function () {
    // console.log(this.router);
  },
};
</script>

<style>
</style>