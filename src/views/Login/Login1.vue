<template>
  <div class="useri-container">
    <Login who="Admin" imgurl="@/assets/bk-logo.png" @click="handleClick" />
  </div>
</template>

<script>
import Login from "@/components/Login";
// import adminimg from "@/assets/bk-logo.png";
export default {
  data() {
    return {
      // img: adminimg,
      loginId: "",
      loginPwd: "",
    };
  },
  components: {
    Login,
  },
  // created() {
  //   console.log(111,adminimg);
  // },
  methods: {
    async handleClick() {
      // 子组件emit抛上来的事件  this.$emit("load");
      const user = await this.$store.dispatch("loginUser/login", {
        loginId: this.loginId,
        loginPwd: this.loginPwd,
      });
      if (user) {
        //成功
        this.$router.push("/protect");
        console.log("user info :", user); // 从数据库中拿到了该用户的所有信息
      } else {
        alert("账号密码错误");
      }
    },
  },
};
</script>

<style>
</style>