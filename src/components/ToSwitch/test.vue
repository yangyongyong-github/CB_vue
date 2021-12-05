<template>
    <ISwitch>
      <template #one>
        <div>
          <input type="radio" name="who" id="admin" />
          <label for="#admin">Admin</label>
        </div>
      </template>
      <template #two>
        <div>
          <input type="radio" name="who" id="useri" />
          <label for="#useri">User_I</label>
        </div>
      </template>
      <template #three>
        <div>
          <input type="radio" name="who" id="userii" />
          <label for="#userii">User_II</label>
        </div>
      </template>
    </ISwitch>
</template>

<script>
import ISwitch from "./index.vue";
export default {
  components: {
    ISwitch,
  },
};
</script>

<style lang="less" scoped>
input{
  width: 1.2em;
  height: 1.2em;
}
</style>