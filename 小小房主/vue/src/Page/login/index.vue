<template>
  <div id="Login">
    <div class="content">
      <div class="left">
        <img src="@/assets/img/login/loginleft.png" />
      </div>
      <div class="right">
        <div class="template">
          <img src="@/assets/img/login/mobilelogo.png" />
          <el-input class="phone" prefix-icon="el-icon-user" placeholder="请输入手机号" v-model="admin.phone">
          </el-input>
          <el-input class="code" prefix-icon="el-icon-lock" placeholder="请输入短信验证码" v-model="admin.code">
            <div :class="/^1[3456789]\d{9}$/.test(admin.phone) && codeText === '发送验证码' ? 'ok send' : 'send'"
              slot="suffix" @click="send">
              {{codeText}}
            </div>
          </el-input>
          <el-button class="login" @click="login" :disabled="!(admin.phone && admin.code)">登录 / 注册</el-button>
        </div>
      </div>
    </div>
    <Dialog :dialogVisible="dialogVisible" :userId="userId" v-on:close="dialogVisible = false" />
  </div>
</template>

<script>
  import {
    postCode,
    postPhone
  } from "@/api/httpApi";

  import Dialog from "@/components/Dialog.vue"

  export default {
    name: "Login",
    data() {
      return {
        admin: {
          phone: "",
          //用户输入的code码
          code: "",
          //后台返回的验证码
          primary: "",
        },
        //倒计时
        num: 10,
        codeText: '发送验证码',
        dialogVisible: false,
        userId: "0"
      };
    },
    components: {
      Dialog: Dialog
    },
    methods: {
      //发送验证码
      send() {
        let {
          admin,
          codeText
        } = this;
        if (/^1[3456789]\d{9}$/.test(admin.phone) && codeText === '发送验证码') {
          this.getcodeMa()
        }
      },
      //倒计时
      timeDown() {
        let timer = setInterval(() => {
          this.num--;
          this.num = this.num === -1 ? 10 : this.num;
          this.codeText = this.num === 0 ? "发送验证码" : this.num;
          if (this.num === 0) {
            clearInterval(timer);
            timer = null;
          }
        }, 1000)
      },
      //获取短信验证码
      getcodeMa() {
        let {
          admin
        } = this
        this.timeDown()
        let VerifyMaData = {
          phone: admin.phone,
          code: Math.floor(Math.random() * (9999 - 1000) + 1000)
        }
        postCode(VerifyMaData).then(res => {
          this.$notify({
            type: 'success',
            message: res.data.code
          });
          this.admin.primary = res.data.code
        })
      },
      //验证登陆
      verifyInfo() {
        let {
          admin,
        } = this;
        postPhone(admin).then(res => {
          if (res.code === '200') {
            this.$notify({
              type: res.code === '200' ? "success" : "error",
              message: res.mes
            });
            localStorage.setItem('admin', JSON.stringify(res.data))
            this.userId = res.data.id
            this.dialogVisible = true
          } else {
            this.admin.code = ""
          }
        }).catch(err => {
          console.log(err);
          this.$notify({
            type: 'fail',
            message: "链接失败，请联系管理员"
          });
        })
      },
      //登陆
      login() {
        this.verifyInfo()
      },
    },
    // html挂在后执行（只执行一次）适用于请求数据
    mounted: function () {
      if (localStorage.getItem('admin')) {
        this.$router.push({
          name: "Home"
        });
      }
    },
  };
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
    background: url("../../assets/img/login/bg.png") no-repeat;
    background-size: cover;
  }

  .content {
    background: #fff;
    width: calc(100% - 240px);
    height: calc(100% - 200px);
    border-radius: 16px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
  }

  .left {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .right {
    flex: 1;

    .template {
      width: 500px;
      margin: 0 auto;

      img {
        width: 160px;
        height: 70px;
        margin-top: 180px;
        margin-left: 158px;
        display: block;
      }

      .phone,
      .code {
        width: 100%;
        margin-top: 20px;

        .el-input__inner {
          border: 0;
          border-bottom: 1px solid #ddd;
          border-radius: 6px;
          width: 100%;
        }
      }

      .code {
        .el-input__suffix {

          .el-input__suffix-inner {
            display: inline-block;
            height: 100%;

            .send {
              height: 100%;
              line-height: 40px;
              cursor: not-allowed;
            }

            .ok {
              color: #0fbc77;
              cursor: pointer;
            }
          }
        }
      }

      .login {
        margin-top: 40px;
        width: 477px;
        height: 46px;
        background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%) !important;
        border-radius: 5px;
        color: #fff !important;
      }
    }
  }
</style>