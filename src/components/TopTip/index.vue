<template>
  <div class="top-tip-container">
    <div class="text">
      <a-icon :type="IconType" />
      {{ tipText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //   图标类型
    IconType: {
      type: String,
      default: "yuque",
      required: false,
    },
    // 提示文字
    tipText: {
      type: String,
      default: "欢迎使用 中国银行!",
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.top-tip-container {
  width: 15%;
  min-width: 80px;
  height: 25px;
  line-height: 25px;
  // 左右居中
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  display: flex;
  padding-left: 30px;
  box-sizing: border-box;
  .text {
    text-align: center;
  }
}
</style>