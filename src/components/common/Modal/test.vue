<template>
  <div class="test">
      <Modal text="您的账户已被管理员冻结！"></Modal>
  </div>
</template>

<script>
import Modal from "./index.vue"
export default {
    components:{
        Modal
    }
}
</script>

<style lang="less" scoped>
.test{
    width: 400px;
    height: 400px;
    border: 2px solid;
}
</style>