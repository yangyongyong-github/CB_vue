<template>
  <div class="to-chat">
    <button @click="toChatHandle">交流区</button>
  </div>
</template>

<script>
export default {
  props: {},
  methods: {
    toChatHandle() {
      // this.$router.push('/chat')
      // window.location.href="http://localhost:5009"
      window.open("http://localhost:5009/");
    },
  },
};
</script>

<style lang="less" scoped>
</style>