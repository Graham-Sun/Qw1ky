<template>
  <el-container id="home">
    <el-header>
      <div class="left">
        <el-image :src="src"></el-image>
      </div>
      <div class="right">
        <div style="display: inline-block" @click="toggle">
          <el-image :src="user.avatarUrl" class="img"></el-image>
          <span class="user">{{ user.nickName }}</span>
        </div>

        <div class="rs" @click="exit">
          <i class="el-icon-switch-button"></i>
          退出
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="240px">
        <el-menu
          :router="true"
          :default-active="active"
          :default-openeds="openeds"
          class="el-menu-vertical-demo"
        >
          <SubMenu :router="router"></SubMenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer
      >Copyright © 易校园有限公司
      湘ICP备15014295号-2公安机关备案号：43011102001327
      友情链接：易校园</el-footer
    >
    <!-- 组件 -->
    <Dialog
      :dialogVisible="dialogVisible"
      :userId="user.id"
      v-on:close="dialogVisible = false"
    />
  </el-container>
</template>

<script>
import SubMenu from "@/components/sun_menu.vue";
import mobilelogo from "@/assets/img/mobilelogo.png";
import Dialog from "@/components/dialog.vue";
export default {
  name: "Home",
  data() {
    return {
      user: "",
      active: "",
      openeds: [],
      src: mobilelogo,
      router: JSON.parse(localStorage.getItem("school")),
      dialogVisible: false,
    };
  },
  // 组件
  components: {
    SubMenu: SubMenu,
    Dialog: Dialog,
  },
  watch: {
    $route(to) {
      this.active = to.path;
      this.router = JSON.parse(localStorage.getItem("school"));
    },
    router() {
      this.getSubMenu(this.router);
      this.getActive(this.router[0], this.$route.path);
    },
  },
  methods: {
    exit() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
    //切换学校
    toggle() {
      this.dialogVisible = true;
    },
    getSubMenu(router) {
      router.forEach((item) => {
        if (item.children) {
          this.openeds.push(item.name); //相当于渲染页面
          this.getSubMenu(item.children);
        }
      });
    },

    getActive(router, redirect) {
      if (redirect !== "/") {
        console.log(this.$route, this.$router);
        console.log(this.$route.path);
        this.active = this.$route.path;
        return;
      }
      // 手动重定向
      if (router.children) {
        router.children.forEach((item, index) => {
          if (index === 0) {
            if (item.children) {
              this.getActive(item);
            } else {
              console.log(12);
              this.active = item.path;
              this.$router.push({ path: item.path });
            }
          }
        });
      } else {
        this.active = router.path;
      }
    },
  },
  mounted() {
    console.log(this.router);
    if (localStorage.getItem("user")) {
      this.getSubMenu(this.router);
      this.getActive(this.router[0], this.$route.path);
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>

<style lang='scss'>
#home {
  width: 100%;
  height: 100%;
  background: #fcfcfc;

  .el-header {
    background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%) !important;
    line-height: 70px !important;
    height: 70px !important;
    padding: 0 31px;
    .left {
      width: 200px;
      height: 70px;
      // background-color: royalblue;
      float: left;
    }
    .right {
      width: 200px;
      height: 70px;
      float: right;
      .img {
        width: 50px;
        height: 50px;
        border: solid 1px #aaa;
        border-radius: 50%;
        margin-top: 10px;
      }
      .user {
        height: 70px;
        line-height: 70px;
        font-size: 14px;
        color: #fff;
        position: relative;
        top: -18px;
        left: 6px;
      }
      .rs {
        display: inline-block;
        float: right;
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .el-main {
    background-color: #f5f5f5;
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
    // background-color: #D3DCE6;
    border-right: solid 1px #ccc;
    el-menu-vertical-demo {
      border-right: solid 0px #fff;
    }
  }
}
</style>