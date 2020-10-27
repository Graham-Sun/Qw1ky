<template>
  <el-container id="Home">
    <el-header>
      <div class="info">
        <img src="@/assets/img/login/logo.png" class="user" alt="">
        <div @click="dialogVisible = true">
          <el-image class="headerImg" :src="user.headImg" :lazy='true'></el-image>
          <span>{{user.name}}</span>
        </div>
      </div>
      <div class="out" @click="logingOut">
        <i class="el-icon-switch-button"></i>
        退出
      </div>
    </el-header>
    <el-container>
      <el-aside width="240px">
        <el-menu :router="true" :default-active="active" :default-openeds="openeds" class="el-menu-vertical-demo">
          <SubMenu :router="router" />
        </el-menu>
      </el-aside>
      <el-main>
        <!-- home：显示路由页面（当前页面下，也就是home的子项） -->
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>
      Copyright © 易校园有限公司
      湘ICP备15014295号-2公安机关备案号：43011102001327 友情链接：易校园
    </el-footer>
    <Dialog :dialogVisible="dialogVisible" :userId="user.id" v-on:close="dialogVisible = false" before-close="close" />
  </el-container>
</template>
<script>

  import SubMenu from '@/components/submenu.vue'
  import Dialog from '@/components/Dialog.vue'
  export default {
    name: "Home",
    data() {
      return {
        user: "",
        active: "",
        openeds: [],
        router: JSON.parse(localStorage.getItem("router")),
        dialogVisible: false,
        loading: "true"
      };
    },
    components: {
      SubMenu: SubMenu,
      Dialog: Dialog
    },
    // 切换同级children，监听$route的变化来修改菜单
    watch: {
      // to:即将去哪个路由，from:从哪个路由过来,next 将要到哪个路由去
      $route(to) {
        this.active = to.path;
        this.router = JSON.parse(localStorage.getItem("router"))
      },
      router() {
        this.getSubMenu(this.router);
        this.getActive(this.$route.path, this.router[0])
      }
    },
    methods: {
      //退出登陆
      logingOut() {
        localStorage.clear();
        this.$router.push({
          name: "Login"
        });
      },
      //展开submenu
      getSubMenu(router) {
        router.forEach((item) => {
          if (item.children) {
            this.openeds.push(item.name)
            this.getSubMenu(item.children)
          }
        })
      },
      //手动重定向
      getActive(redirect, router) {
        if (redirect !== "/") {
          this.active = this.$route.path; 2
          return;
        }
        if (router.children) {
          router.children.forEach((item, index) => {
            if (index === 0) {
              if (item.children) {
                this.getActive(item)
              } else {
                this.active = item.path
                this.$router.push({ path: item.path })
              }
            }
          })
        } else {
          this.active = router.path
        }
      }
    },
    mounted() {
      if (localStorage.getItem("admin")) {
        this.user = JSON.parse(localStorage.getItem("admin"))
        this.getSubMenu(this.router)
        this.getActive(this.$route.path, this.router[0])
      } else {
        this.$router.push({
          name: "Login"
        });
      }
      /*
      1、this.$router: router的实例，包含全部路由和参数
      2、this.$route: 当前页面路由参数，包含传过来的参数params、query
      */
      // this.active = this.$route.path;
      // 使用params传参：默认会隐藏拼接的路径，同时需要使用name形式传递
      // this.$router.push({ name: "Login", params: { id: "456" } });

      // 使用query传参：默认显示/login?id=456，不受name、path的影响
      //  this.$router.push({ name: "Login", query: { id: "456" } });
    }
  }
</script>

<style lang="scss">
  #Home {
    height: 100%;
    width: 100%;
    background: #fcfcfc;

    .el-header {
      width: 100%;
      background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%) !important;
      line-height: 70px !important;
      padding: 0 31px;
      display: flex;
      justify-content: space-between;

      .user {
        width: 200px;
      }

      .info {
        width: 90%;
        display: flex;
        justify-content: space-between;
        cursor: pointer;

        .headerImg {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          position: relative;
          top: 6px;
        }

        span {
          margin-left: 4px;
          position: relative;
          top: -12px;
          font-weight: 700;
          background-image: -webkit-linear-gradient(bottom,
              rgb(255, 60, 0),
              #fdf903,
              #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        div {
          color: #fff;
          line-height: 50px;

          img {
            border-radius: 50%;
            width: 50px;
            height: 50px;
          }
        }
      }

      .out {
        color: #fff;
        cursor: pointer;
      }
    }

    .el-footer {
      background: #343533;
      color: #fff;
      text-align: center;
      line-height: 43px !important;
      height: 43px !important;
      font-size: 16px;
    }

    .el-aside {
      border-right: 1px solid #ccc;
      background: #fff;

      .el-menu-vertical-demo {
        border-right: 0px solid #fff;
      }
    }
  }
</style>