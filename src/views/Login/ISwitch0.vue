<template>
  <div class="iswitch-container">
    <ISwitch>
      <div>欢迎来到中国银行，请选择登录主体：</div>
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
    <img src="@/assets/home-img0.jpg" alt="" />
  </div>
</template>

<script>
import ISwitch from "@/components/ISwitch";
export default {
  data() {
    return {};
  },
  components: {
    ISwitch,
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>