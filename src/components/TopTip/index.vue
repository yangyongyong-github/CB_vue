<template>
  <div class="top-tip-container">
    <div class="text"><Icon :type="IconType" />
    {{ tipText }}</div>
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
  width: 20%;
  min-width: 100px;
  height: 20px;
  // 左右居中
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 20px;
  background-color: rgb(214, 190, 160);
  border-radius: 20px;
  display: flex;
  padding-left: 30px;
  box-sizing: border-box;
  .text {
    text-align: center;
  }
}
</style>