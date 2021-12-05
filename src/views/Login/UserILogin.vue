<template>
  <div class="useri-container">
    <h3 class="title">User_I login pages</h3>
    <p>
      <!-- autocomplete="new-password" -->
      账号：<input type="text" v-model="loginId" />
    </p>
    <p>密码：<input type="password" v-model="loginPwd" /></p>
    <p>
      <button @click="toLogin">登录</button>
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
    async toLogin() {
      const user = await this.$store.dispatch("useri_loginUser/login", {
        loginId: this.loginId,
        loginPwd: this.loginPwd,
      });
      if (user) {
        //成功
        this.$router.push("/useri");
        console.log("user info :", user); // 从数据库中拿到了该用户的所有信息
        try {
        
          /**
           * 一次一个对象写入？
           * localStorage.setItem("userinfo", user);
           *
           * -  太大了，违反了key:value,
           *        无法写入，写入时显示 [object object]
           * -  属性读取可行？
           *        [object Object] undefined
           *
           */

          // 取出数据一个一个key:value写入
          //  <!-- 基础信息 -->
          localStorage.setItem("useri-name", user.name);
          localStorage.setItem("useri-sex", user.sex);
          localStorage.setItem("useri-age", user.age);
          localStorage.setItem("useri-job", user.job);
          localStorage.setItem("useri-mobile", user.mobile);
          localStorage.setItem("useri-company", user.company);

          //  <!-- 业务信息 -->
          localStorage.setItem("useri-cage", user.cage);
          localStorage.setItem("useri-account", user.account);
          localStorage.setItem("useri-loginId", user.loginId);

          // <!-- 用户贷款信息 -->
          localStorage.setItem("useri-loan", user.loan);
          localStorage.setItem("useri-interest", user.interest);
          localStorage.setItem("useri-indet", user.ident);
          localStorage.setItem("useri-cause", user.cause);

          // 用户控制信息
          localStorage.setItem("useri-limited", user.limited);
          localStorage.setItem("useri-freezed", user.isFreezed);
          console.log(" > localStorage one by one write done .");
          // console.log(userInfo); // null
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
.useri-container {
  border: 1px solid;
  .title {
    text-align: center;
  }
}
</style>
