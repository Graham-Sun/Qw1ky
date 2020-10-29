<template>
  <el-container id="home">
    <el-header>
      <div class="logo">
        <el-image class="logo-img" :src="logoUrl" fit="cover"></el-image>
      </div>
      <div class="message">
        <div class="message_content" @click="loginFlag = true">
          <el-image :src="imgUrl" fit="cover"></el-image
          ><span>{{ nickName }}</span>
        </div>
        <div class="exit" @click="exit()">
          <i class="el-icon-switch-button"></i>退出
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="230px">
        <el-menu
          :router="true"
          :default-active="active"
          class="el-menu-vertical-demo"
          :default-openeds="openeds"
        >
          <SubMenu :router="router" />
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-marketing icolor"></i>
              <span>成绩分析</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/aSingleAnalysis">单次分析</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-home icolor"></i>
              <span>学校管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/teacherManagement">教师管理</el-menu-item>
              <el-menu-item index="/applicationManagement"
                >申请管理</el-menu-item
              >
              <el-menu-item index="2-3">其它</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <Dialog
      :loginFlag="loginFlag"
      :accountId="accountId"
      v-on:closeDialog="loginFlag = false"
    />
    <el-footer
      >Copyright © 易校园有限公司
      湘ICP备15014295号-2公安机关备案号：43011102001327 友情链接：易校园
    </el-footer>
  </el-container>
</template>

<script>
import { _obj } from "@/utils/collection";
import logoUrl from "@/assets/img/login/logo.png";
import SubMenu from "@/components/subMenu.vue";
import Dialog from "@/components/dialog.vue";

export default {
  name: "Home",
  data() {
    return {
      active: "",
      imgUrl: "",
      nickName: "",
      logoUrl: logoUrl,
      openeds: [],
      router: _obj(localStorage.getItem("router")),
      loginFlag: false,
      accountId: "0",
    };
  },
  components: {
    SubMenu: SubMenu,
    Dialog: Dialog,
  },
  methods: {
    //切换权限，打开弹框
    openDialog() {
      this.loginFlag = true;
    },
    //同时展示多个组件内容
    getOpeneds(router) {
      router.forEach((element) => {
        if (element.children) {
          this.openeds.push(element.name);
          this.getOpeneds(element.children);
        }
      });
    },
    //页面重定向
    getActive(router) {
      //如果当前路由不是“/”的话, 那就重定向当前页面
      if (this.$route.path !== "/") {
        this.active = this.$route.path;
        return;
      }
      //根据children来重定向 当前页面（如前进或后退时候需要重定向页面）
      if (router.children) {
        router.children.forEach((element, index) => {
          /*
          1.因为不确定当前这条数据是否是单条数据，如果是单条，可以不加index === 0的判定
          2.如果当前数据是多条数据，我们用forEach循环后，重定向的是最后一条数据，而我们需要的是第一条，所以要保证他的下标为0
          */
          if (index === 0) {
            if (element.children) {
              this.getActive(element.children);
            } else {
              this.active = element.path;
              this.$router.push({ path: element.path });
            }
          }
        });
      } else {
        this.active = router.path;
      }
    },
    //退出
    exit() {
      localStorage.clear();
      this.$router.push({ path: "/login" });
    },
  },
  //监听当前页面的路由
  watch: {
    // to--->去到哪个页面 from--->从哪个页面来的
    $route(to) {
      //to每次操作都会执行,但如果是后退的话 to监听不到
      this.active = to.path;
      this.router = _obj(localStorage.getItem("router"));
    },
    router() {
      this.getOpeneds(this.router);
      this.getActive(this.router[0]);
    },
  },
  mounted: function () {
    if (!localStorage.getItem("account")) {
      this.$router.push({ name: "Login" });
    } else {
      this.getOpeneds(this.router);
      this.getActive(this.router[0]);
      let account = _obj(localStorage.getItem("account"));
      this.accountId = account.id;
      this.imgUrl = account.avatarUrl;
      this.nickName = account.nickName;
    }
  },
};
</script>

<style lang="scss">
#home {
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
  .el-header {
    line-height: 80px !important;
    height: 80px !important;
    background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%);
    display: flex;
    justify-content: space-between;
    .logo {
      .logo-img {
        width: 180px;
        height: 100%;
      }
    }
    .message {
      width: 270px;
      display: flex;
      color: #fff;
      .message_content {
        display: flex;
        span {
          margin-left: 10px;
          margin-right: 30px;
        }
        .el-image {
          width: 60px;
          height: 60px;
          margin-top: 10px;
          border-radius: 50%;
        }
      }
      .exit {
        font-size: 20px;
        font-weight: 700;
        cursor: pointer;
        i {
          margin-right: 10px;
        }
      }
    }
  }
  .el-footer {
    background-color: #343533;
    color: #fff;
    text-align: center;
    height: 60px !important;
    line-height: 60px !important;
  }
  .el-container {
    background: #fff;
    .el-aside {
      background-color: #fff;
      border-right: solid 1px #e6e6e6;
      color: #333;
      line-height: 200px;
    }
    .icolor {
      color: #1dbd84;
    }
    .el-menu {
      border-right: 0px solid #e6e6e6;
    }
    .el-main {
      background-color: #e9eef3;
      color: #333;
      text-align: center;
      // line-height: 160px;
    }
  }
}
</style>