<template>
  <div id="login">
    <div class="app_content">
      <div class="left">
        <img :src="img.loginleft" alt="" />
      </div>
      <div class="right">
        <div class="right-content">
          <div class="img">
            <img :src="img.mobilelogo" alt="" />
          </div>
          <el-input
            class="phone"
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
            v-model="account.tel"
          ></el-input>
          <el-input
            class="code"
            prefix-icon="el-icon-lock"
            placeholder="请输入短信验证码"
            v-model="account.randomCode"
            ><div
              :class="
                /^1[3456789]\d{9}$/.test(account.tel) ? 'send ok' : 'send'
              "
              slot="suffix"
              @click="/^1[3456789]\d{9}$/.test(account.tel) ? send() : ''"
            >
              {{ text }}
            </div>
          </el-input>
        </div>
        <el-button
          class="login"
          @click="login"
          :disabled="
            !(/^1[3456789]\d{9}$/.test(account.tel) && account.randomCode)
          "
          >登录 / 注册</el-button
        >
      </div>
    </div>
    <Dialog
      :loginFlag="loginFlag"
      :accountId="accountId"
      v-on:closeDialog="loginFlag = false"
    />
  </div>
</template>

<script>
import { postTelLogin, postRandomCode } from "@/api/api";
import { _str, _random } from "@/utils/collection";
import loginleft from "@/assets/img/login/loginleft.png";
import mobilelogo from "@/assets/img/login/mobilelogo.png";
import Dialog from "@/components/dialog.vue";
export default {
  name: "Login",
  data() {
    return {
      accountId: "0",
      account: {
        tel: "",
        randomCode: "",
        newRandomCode: "",
      },
      img: {
        loginleft: loginleft,
        mobilelogo: mobilelogo,
      },
      time: 10,
      text: "发送验证码",
      loginFlag: false,
    };
  },
  components: {
    Dialog: Dialog,
  },
  methods: {
    //获取手机号
    postTelLogin() {
      postTelLogin(this.account).then((res) => {
        let { data, code, desc } = res.data;
        if (code === 200) {
          this.$message({
            message: desc,
            type: "success",
          });
          localStorage.setItem("account", _str(data));
          this.accountId = data.id;
          this.loginFlag = true;
        } else {
          this.$message.error(desc);
        }
      });
    },
    //获取验证码
    postRandomCode() {
      let verifyCode = _random(9999, 1000);
      postRandomCode({
        tel: this.account.tel,
        randomCode: verifyCode,
      }).then((res) => {
        let { data, code } = res.data;
        if (code === 200) {
          this.account.newRandomCode = data.code;
          this.account.randomCode = data.code;
        }
      });
    },
    //发送验证码
    send() {
      this.$message.success("发送成功");
      let timer = setInterval(() => {
        this.time--;
        this.text = this.time === 0 ? "发送验证码" : `${this.time}s`;
        if (this.time < 1) {
          clearInterval(timer);
          this.time = 10;
        }
      }, 1000);
      this.postRandomCode();
    },
    //登录
    login() {
      this.postTelLogin();
    },
  },
  // html挂在后执行 适用于请求数据（且只执行一次）
  mounted: function () {},
};
</script>

<style lang="scss">
#login {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login/bg.png") no-repeat;
  background-size: cover;
  .app_content {
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
    .right-content {
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
        .send {
          width: 80px;
          font-size: 16px;
          position: absolute;
          right: 20px;
          cursor: not-allowed;
        }
        .ok {
          color: #0fbc77;
          cursor: pointer;
        }
      }
    }
    .login {
      margin-top: 40px;
      width: 477px;
      height: 46px;
      background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%);
      border-radius: 5px;
      color: #fff;
    }
  }
}
</style>

