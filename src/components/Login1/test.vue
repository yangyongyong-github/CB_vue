<template>
  <Login
    who="User_I"
    imgurl="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
    @click="handleClick"
  />
</template>

<script>
import Login from "./index.vue";
export default {
  components: {
    Login,
  },
  methods: {
    async handleClick() {
      // 子组件emit抛上来的事件  this.$emit("load");

      const user = await this.$store.dispatch("user_i_loginUser/login", {
        loginId: this.loginId,
        loginPwd: this.loginPwd,
      });
      if (user) {
        //成功
        this.$router.push("/useri");
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