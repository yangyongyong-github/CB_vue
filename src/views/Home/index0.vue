<template>
  <div class="home-container">
    <h2>Home</h2>
    <button @click="GetRate">getRate</button>
    <button @click="GetBank">bank</button>
    <button @click="GetUsers">users</button>
  </div>
</template>

<script>
export default {
  created() {
    this.init();
    console.log('store  : ', this.$store.state)
  },
  methods: {
    async init() {
      this.GetRate(1);
      this.GetBank("CBNo1");
      this.GetUsers();
      console.log("init data done .");
    },
    async GetRate({ id = 1 }) {
      const rateInfo = await this.$store.dispatch("getRate", { id });
      if (rateInfo) {
        // 通过该id 拿到了对应的 数据
        console.log("init [rate] data : ", rateInfo);
      }
    },
    async GetBank({ id = "CBNo1" }) {
      const bankInfo = await this.$store.dispatch("getBank", { id });
      if (bankInfo) {
        // 通过该id 拿到了对应的 数据
        console.log("init [bank] data : ", bankInfo);
      }
    },
    async GetUsers() {
      const usersInfo = await this.$store.dispatch("getUsers");
      if (usersInfo) {
        // 通过该id 拿到了对应的 数据
        console.log("init [users] data : ", usersInfo);
      }
    },
  },
};
</script>