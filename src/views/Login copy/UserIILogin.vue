<template>
  <div class="userii-container">
    <div class="login">
      <h3 class="title">User_II login pages</h3>
      <p>
        <!-- autocomplete="new-password" -->
        账号：<input type="text" v-model="loginId" />
      </p>
      <p>密码：<input type="password" v-model="loginPwd" /></p>

      <button @click="toLogin">login</button>
      <button @click="toRegister" class="register-btn">register</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginId: "",
      loginPwd: "",
    };
  },
  methods: {
    // userii register
    async toRegister() {
      this.$router.replace("/useriiRegister");
    },
    // userii login
    async toLogin() {
      const user = await this.$store.dispatch("userii_loginUser/login", {
        loginId: this.loginId,
        loginPwd: this.loginPwd,
      });
      if (user) {
        //login enter
        this.$router.push("/userii");
        console.log("user info :", user); // 从数据库中拿到了该用户的所有信息
        try {
          //  <!-- 基础信息 -->
          localStorage.setItem("userii-name", user.name);
          localStorage.setItem("userii-sex", user.sex);
          localStorage.setItem("userii-age", user.age);
          localStorage.setItem("userii-job", user.job);
          localStorage.setItem("userii-mobile", user.mobile);

          //  <!-- 业务信息 -->
          localStorage.setItem("userii-cage", user.cage);
          localStorage.setItem("userii-account", user.account);
          localStorage.setItem("userii-loginId", user.loginId);

          // <!-- 用户存款信息 -->
          localStorage.setItem("userii-deposit", user.deposit);
          localStorage.setItem("userii-interest", user.interest);

          // 用户控制信息
          localStorage.setItem("userii-freezed", user.isFreezed);

          console.log(" > localStorage one by one write done .");
        } catch (error) {
          new Error("localStorage write fail .");
        }
      } else {
        alert("账号密码有问题");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.userii-container {
  .login {
    border: 1px solid;
    .title {
      text-align: center;
    }
    button {
      padding: 10px;
      margin-left: 50px;
    }
  }
}
</style>
