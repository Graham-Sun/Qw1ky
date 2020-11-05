<template>
  <div id="login">
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="70"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="repulse"
      :clickEffect="true"
      clickMode="remove"
      class="particles"
    >
    </vue-particles>
    <div class="content">
      <div class="left">
        <img :src="img.loginleft" />
      </div>
      <div class="right">
        <div class="template">
          <img :src="img.mobilelogo" />
          <el-input
            class="phone"
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
            v-model="phone"
          >
          </el-input>
          <el-input
            class="code"
            prefix-icon="el-icon-lock"
            placeholder="请输入短信验证码"
            v-model="code"
          >
            <div
              :class="
                /^1[3456789]\d{9}$/.test(phone) && codeText === '发送验证码'
                  ? 'ok send'
                  : 'send'
              "
              slot="suffix"
              @click="send"
            >
              {{ codeText }}
            </div>
          </el-input>
          <el-button
            :class="
              /^1[3456789]\d{9}$/.test(phone) && code
                ? 'login'
                : 'disable login'
            "
            @click="login"
            :disabled="!(/^1[3456789]\d{9}$/.test(phone) && code)"
            >登录 / 注册</el-button
          >
        </div>
      </div>
    </div>
    <Dialog
      :dialogVisible="dialogVisible"
      :userId="userId"
      v-on:close="dialogVisible = false"
    />
  </div>
</template>

<script>
import { postCode, postPhoneLogin } from "@/api/api";
import { _random } from "@/utils/utils";
import loginleft from "@/assets/img/login/loginleft.png";
import mobilelogo from "@/assets/img/login/mobilelogo.png";
import Dialog from "@/components/dialog";
export default {
  name: "Login",
  data() {
    return {
      img: {
        loginleft: loginleft,
        mobilelogo: mobilelogo,
      },
      phone: "",
      code: "",
      phoneCode: "",
      codeText: "发送验证码",
      schoolList: [],
      userId: "0",
      dialogVisible: false,
    };
  },
  components: {
    Dialog: Dialog
  },
  methods: {
    postCode() {
      let phoneCode = _random(1000, 9999);
      this.$message.success("发送成功");
      postCode({
        phone: this.phone,
        phoneCode: phoneCode,
      }).then((res) => {
        let { code, data } = res;
        if (code === 1) {
          this.phoneCode = data.code;
          // 正常不会显示code码
          this.code = data.code;
        }
      });
    },
    send() {
      if (
        /^1[3456789]\d{9}$/.test(this.phone) &&
        this.codeText === "发送验证码"
      ) {
        let second = 10;
        let time = setInterval(() => {
          second--;
          this.sendCode = second === 0 ? true : false;
          this.codeText = second === 0 ? "发送验证码" : `${second}s`;
          if (second < 1) {
            clearInterval(time);
          }
        }, 1000);
        this.postCode();
      }
    },
    // 用户登录
    postPhoneLogin() {
      let { phone, code, phoneCode } = this;
      let _message = this.$message({
        iconClass: "el-icon-loading",
        message: "登陆中请稍等...",
        duration: 15000,
        center: "center",
      });
      postPhoneLogin({
        phone: phone,
        code: code,
        phoneCode: phoneCode,
      }).then((res) => {
        let { data, code, message } = res;
        _message.close();
        if (code === 1) {
          this.userId = data.id;
          localStorage.setItem("user", JSON.stringify(data));
          this.dialogVisible = true;
        }
        this.$message({
          message: message,
          type: code === 1 ? "success" : "error",
        });
      });
    },
    login() {
      this.postPhoneLogin();
    },
  },
  // html挂在后执行（只执行一次）适用于请求数据
  mounted: function() {
    if (localStorage.getItem("user")) {
      //  query不会受到重定向（redirect）的影响， login---->Home?id=456--->menu1?id=456
      this.$router.push({ name: "Home" });
    }
  },
};
</script>

<style lang="scss">
#login {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login/bg.png") no-repeat;
  background-size: cover;

  .particles {
    z-index: 20;
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .content {
    background: #fff;
    width: calc(100% - 240px);
    height: calc(100% - 200px);
    min-width: 1400px;
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
    position: relative;
    .template {
      position: absolute;
      z-index: 100;
      width: 500px;
      left: 50%;
      margin-left: -250px;

      img {
        width: 160px;
        height: 70px;
        margin-top: 180px;
        margin-left: 158px;
        display: block;
      }

      .phone,
      .code {
        width: 477px;
        margin-top: 20px;
        .el-input__inner {
          border: 0px solid #fff;
          border-bottom: 1px solid #ddd;
          border-radius: 0px;
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
        background: linear-gradient(
          270deg,
          #17c7bb 0%,
          #0fbc77 100%
        ) !important;
        border-radius: 5px;
        color: #fff !important;
      }
      .disable {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
}
</style>
