<template>
  <div class="retsult-tip" :v-show="showStatus">
    <a-result :status="status" :title="title" />
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: "success",
      isRequired: true,
    },
    title: {
      type: String,
      default: "",
      isRequired: false,
    },
    showStatus: {
      type: Boolean,
      default: false,
      isRequired: false,
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/styles/mixin.less';

.retsult-tip {
  background-color: white;
  .self-fill();
}
</style>