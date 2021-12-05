<template>
  <div class="login-container">
    <h4>{{ who }} 登录界面</h4>
    <div class="input-area">
      <p>
        <!-- autocomplete="new-password" -->
        账号：<input type="text" :v-model="loginId" />
      </p>
      <p>密码：<input type="password" :v-model="loginPwd" /></p>
      <p>
        <button @click="handleClick">登录</button>
      </p>
    </div>
    <div class="img">
      <img :src="imgurl"/>
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
  props: {
    who: {
      type: String,
      default: "默认主体：管理员",
    },
    imgurl: {
      type: String,
      required: true,
    },
  },
  methods: {
    // 使用者去填写
    async handleClick() {
        this.$emit("click");
    //   //   const user = await this.$store.dispatch("loginUser/login", {
    //   //     loginId: this.loginId,
    //   //     loginPwd: this.loginPwd,
    //   //   });
    //   if (user) {
    //     //成功
    //     this.$router.push("/");
    //     console.log("user info :", user); // 从数据库中拿到了该用户的所有信息
    //   } else {
    //     alert("账号密码错误");
    //   }
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
    .img{
        width: 300px;
        height: 200px;
    }
}
</style>
