<template>
  <div class="login-container">
    <h3 class="page-title">用户登录页面</h3>
    <div class="input-area">
      <div class="indet">Login {{ loginFormData.flag }}</div>
      <p>
        <!-- autocomplete="new-password" -->
        <!-- 账号 -->
        {{ language.Account[lang] }}
        <input type="text" v-model="loginFormData.loginId" />
      </p>
      <p>
        <!-- 密码 -->

        {{ language.PassWord[lang] }}
        <input type="password" v-model="loginFormData.loginPwd" />
      </p>

      <!-- 选择登录身份 -->
      {{ language.SelectYouLoginIdentify[lang] }}
      <select v-model="loginFormData.flag">
        <option
          v-for="(item, index) in userLists"
          :key="index"
          :value="item.name"
        >
          {{ item.name }}
        </option>
      </select>
      <p class="btn">
        <button type="success" @click="toLogin">
          <!-- 登录 -->
          {{ language.Login[lang] }}
        </button>

        <button @click="toRegister">
          <!-- 注册 -->
          {{ language.Register[lang] }}
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      loginFormData: {
        loginId: "",
        loginPwd: "",
        flag: "",
      },
      userLists: [{ name: "admin" }, { name: "useri" }, { name: "userii" }],
    };
  },
  components: {},
  computed: mapState(["userData", "lang", "language"]),
  methods: {
    async toLogin() {
      if (
        !this.loginFormData.loginId ||
        !this.loginFormData.loginPwd ||
        !this.loginFormData.flag
      ) {
        // alert("值缺失！");
        this.openNotificationWithIcon("warning"); // msg type
        return;
      }
      const userObj = {
        loginId: this.loginFormData.loginId,
        loginPwd: this.loginFormData.loginPwd,
        flag: this.loginFormData.flag,
      };

      const user = await this.$store.dispatch("login", userObj);

      if (user) {
        // log in
        this.$router.push(`/${userObj.flag}`);
        console.log("user info :", user); // 从数据库中拿到了该用户的所有信息
        try {
          this.$store.commit("setUserData", user);
        } catch (error) {
          new Error("store write fail .");
        }
      } else {
        // alert("账号密码、类型不匹配");
        this.openNotificationWithIcon("error"); // msg type
      }
    },
    // 去注册
    toRegister() {
      this.$router.push("/register");
    },

    // msg info (from antd)
    openNotificationWithIcon(type) {
      // 根据消息类型定义提示语
      var msg = "";
      if (type === "success") {
        msg = "Login Done"; // 登录成功实际上不用提示，自动跳转页面
      } else if (type === "error") {
        msg = "账号密码、类型不匹配";
      } else if (type === "warning") {
        msg = "值缺失";
      }

      // 提示
      this.$notification[type]({
        message: "Login Tip",
        description: msg + " !",
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";

.login-container {
  width: 100%;
  height: 100%;
  .input-area {
    .indet {
      padding-left: 50px;
      font-weight: bold;
      font-size: 1.2em;
      margin-bottom: 10px;
    }
    padding: 50px;
    border-radius: 30px;
    .border-shadow-login-hover();
    .self-center();
    .btn {
      .to-flex();
      margin-top: 20px;
    }
  }
}
</style>