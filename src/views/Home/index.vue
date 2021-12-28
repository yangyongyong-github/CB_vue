<template>
  <div class="home-container">
    <h2>Home</h2>
    <button @click="handleClick">getRate</button>
  </div>
</template>

<script>
export default {
  methods: {
    // async handleClick(id=1) { // pointX ??
    async handleClick() {
      const id = 1;
      const rateInfo = await this.$store.dispatch("getRate", { id:1} );

      // const userObj = {
      //   loginId: "admin",
      //   loginPwd: "1234",
      //   flag: "admin",
      // };
      // const user = await this.$store.dispatch("login", userObj);
      // console.log(user);

      console.log("Home : ", id);
      if (rateInfo) {
        // 通过该id 拿到了对应的 数据
        console.log("init load rate data : ", rateInfo);
      }
    },
  },
};
</script>