<template>
  <div class="login-container">
    <h3>Login {{ loginFormData.flag }}</h3>
    <p>
      <!-- autocomplete="new-password" -->
      账号：<input type="text" v-model="loginFormData.loginId" />
    </p>
    <p>密码：<input type="password" v-model="loginFormData.loginPwd" /></p>

    <!-- 选择登录身份 -->
    选择登录身份
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
      <button @click="toLogin">登录</button>
      <button @click="toRegister">注册</button>
    </p>
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
  computed: mapState(["userData", "lang"]),
  methods: {
    async toLogin() {
      if (
        !this.loginFormData.loginId ||
        !this.loginFormData.loginPwd ||
        !this.loginFormData.flag
      ) {
        alert("值缺失！");
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
        alert("账号密码、类型不匹配");
      }
    },
    // 去注册
    toRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";

.login-container {
  .self-center();
  .btn {
    .to-flex();
  }
}
</style>