<template>
  <div id="app">
    <div class="box">
      <div class="left">
        <img :src="img.loginleft" alt="" />
      </div>
      <div class="right">
        <div class="right-cont">
          <img :src="img.mobilelogo" alt="" />
          <el-input
            class="phone"
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
            v-model="account.phone"
          >
          </el-input>
          <el-input
            class="code"
            prefix-icon="el-icon-lock"
            placeholder="请输入短信验证码"
            v-model="account.code"
          >
            <div
              :class="
                /^1[3456789]\d{9}$/.test(account.phone) ? 'ok send' : 'send'
              "
              slot="suffix"
              @click="send"
            >
              {{ text }}
            </div>
          </el-input>

          <el-button
            class="btn"
            @click="btn"
            :disabled="
              !(/^1[3456789]\d{9}$/.test(account.phone) && account.code)
            "
            >登录</el-button
          >
        </div>
        <!-- 组件 -->

        <!-- v-bind:节点中属性。。。 缩写： -->
        <!-- v-on:节点绑定事件。。。 缩写@ -->
        <!-- :userId="userId" -->
        <!-- v-on:close="dialogVisible = false" -->
      </div>
      <Dialog :dialogVisible="dialogVisible" :userId="userId" v-on:close="dialogVisible=false"/>
    </div>
  </div>
</template>

<script>
import { phoneLogin, postCode } from "@/api/api";
import { _random } from "@/utils/utils";
import loginleft from "@/assets/img/loginleft.png";
import mobilelogo from "@/assets/img/mobilelogo.png";
import Dialog from "@/components/dialog.vue";
export default {
  name: "Login",
  data() {
    return {
      userId: "0",
      account: {
        phone: "",
        code: "",
        newCode: "",
      },
      img: {
        mobilelogo: mobilelogo,
        loginleft: loginleft,
      },
      text: "发送验证码",
      time: 10,
      dialogVisible: false,
    };
  },
  // 转换组件
  components: {
    Dialog: Dialog,
  },
  methods: {
    // 登录请求
    phoneLogin() {
      phoneLogin(this.account).then((res) => {
        // console.log(res);
        let { data, code, message } = res.data;
        if (code === 1) {
          // console.log(data);
          localStorage.setItem("user", JSON.stringify(data));
          this.userId = data.id;

          // 从新赋值 显示弹框
          this.dialogVisible = true;
          // console.log(this.dialogVisible);
          this.$message({
            message: message,
            type: "success",
          });
          // this.$router.push({ name: "Home" });
        } else {
          this.$message({
            message: message,
            type: "error",
          });
        }
      });
    },
    // 验证码按钮
    send() {
      if (/^1[3456789]\d{9}$/.test(this.account.phone)) {
        // console.log(this.account.phone);
        let timer = setInterval(() => {
          //添加 定时器
          this.time--;
          this.text = this.time === 0 ? "发送验证码" : `${this.time}秒`; //什么时候 是 发送验证码 什么时候是道及时间
          if (this.time < 1) {
            // 判断时间是否走完   小于一秒就进入
            clearInterval(timer); //清除定时器
            this.time = 10; // 因为 一次倒计时走完 就会出现负数  所以给 时间 从新赋值
          }
        }, 1000);
        this.sendCode();
      }
    },
    //发送验证码
    sendCode() {
      let yzm = _random(1000, 9999);
      postCode({
        phone: this.account.phone, //向后端 传入 输入的手机号
        newCode: +yzm, //新生成的随机数验证码  放入新声明 中
      }).then((res) => {
        let { data, code } = res.data;
        // console.log(data);
        //判断什么时候 放入验证码
        if (code === 1) {
          this.account.newCode = +data.code; //将后端传来的验证码 传入新 验证码中
          this.account.code = data.code;
        }
      });
    },

    // 登录按钮
    btn() {
      this.phoneLogin();
    },
  },
  // html挂在后执行（只执行一次）适用于请求数据
  mounted: function () {
    if (localStorage.getItem("user")) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.box {
  width: calc(100% - 240px);
  height: calc(100% - 200px);
  background-color: #fff;
  border-radius: 20px;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  overflow: hidden;
  .left {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right {
    flex: 1;
    .right-cont {
      width: 500px;
      margin: 0px auto;
    }
    img {
      margin-top: 180px;
    }
    .phone,
    .code {
      width: 477px;
      margin-top: 20px;

      .el-input__inner {
        font-size: 20px;
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

    .btn {
      margin-top: 50px;
      width: 500px;
      height: 50px;
      font-size: 20px;
      color: #fff;
      background-color: #0fbc77;
      border: none;
      outline: none;
    }
  }
}
</style>
