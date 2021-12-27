<template>
  <div>
    <h3>Admin Login</h3>
    <p>
      <!-- autocomplete="new-password" -->
      账号：<input type="text" v-model="loginId" />
    </p>
    <p>密码：<input type="password" v-model="loginPwd" /></p>
    <p>
      <button @click="handleClick">登录</button>
    </p>
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
    async handleClick() {
      const user = await this.$store.dispatch("loginUser/login", {
        loginId: this.loginId,
        loginPwd: this.loginPwd,
      });
      if (user) {
        //成功
        this.$router.push("/admin");
        console.log("user info :", user); // 从数据库中拿到了该用户的所有信息

         try {
          //  <!-- 基础信息 -->
          localStorage.setItem("admin-name", user.name);
        
          //  <!-- 业务信息 -->
          // localStorage.setItem("admin-account", user.account);
          localStorage.setItem("admin-loginId", user.loginId);

          // <!-- 资金管理信息 -->
          localStorage.setItem("admin-corpus", user.corpus);

          console.log(" > localStorage one by one write done .");
        } catch (error) {
          new Error("localStorage write fail .");
        }

      } else {
        alert("账号密码错误");
      }
    },
  },
};
</script>

<style></style>
