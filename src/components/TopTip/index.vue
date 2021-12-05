<template>
  <div class="top-tip-container">
    <Icon :type="IconType" />
    <div class="text">{{ tipText }}</div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  props: {
    //   图标类型
    IconType: {
      type: String,
      default: "empty",
      required: false,
    },
    // 提示文字
    tipText: {
      type: String,
      default: "欢迎使用 中国银行!",
      required: true,
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="less" scoped>
.top-tip-container {
  
  width: 40%;
  height: 50px;
  // 左右居中
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 20px;
  border: 2px solid rgb(190, 179, 179);
  background-color: rgb(238, 222, 202);
  border-radius: 20px;
  .text {
    font-family: "Lucida Sans";
    // color: @;
    text-align: center;
  }
}
</style>