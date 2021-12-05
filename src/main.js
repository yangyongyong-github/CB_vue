import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// showMessage
import { showMessage } from "./utils";
Vue.prototype.$showMessage = showMessage;

//在网站被访问时，需要用token去换取用户的身份
// 下面的几个不能同时存在？
// store.dispatch("loginUser/whoAmI");  // admin
// store.dispatch("useriloginUser/whoAmI"); // useri
// store.dispatch("useriiloginUser/whoAmI"); // userii

import "./styles/global.less";
Vue.config.productionTip = false;

/* 注册全局指令 */ 
// vLoading
import vLoading from "./directives/loading";
Vue.directive("loading", vLoading);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
