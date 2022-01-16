import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// showMessage
import { showMessage } from "./utils";
Vue.prototype.$showMessage = showMessage;

//在网站被访问时，需要用token去换取用户的身份
// store.dispatch("whoAmI");  

import "./styles/global.less";
import "./styles/common.css"
Vue.config.productionTip = false;

import "./eventBus";



/* 注册全局指令 */ 
// vLoading
import vLoading from "./directives/loading";
Vue.directive("loading", vLoading);

/**
 * global use antd-vue
 */
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Antd)


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
