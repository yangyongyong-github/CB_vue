<template>
  <div :type="type" title="" class="alert"></div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "warn",
      isRequired: true,
    },
  },
  methods: {
    openNotificationWithIcon(type) {
      // 根据消息类型定义提示语
      var msg = "";
      if (type === "success") {
        msg = "Login Done"; // 登录成功实际上不用提示，自动跳转页面
      } else if (type === "error") {
        msg = "账号密码、类型不匹配";
      } else if (type === "warning") {
        msg = "值缺失";
      }

      // 提示
      this.$notification[type]({
        message: "Login Tip",
        description: msg + " !",
      });
    },
  },
};
</script>

<style>
</style>