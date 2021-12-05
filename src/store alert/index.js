import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// admin
import * as loginServ_admin from "../service/loginService";
// user ii
import * as loginServ_userii from "../service/userii_loginService";
// import * as rateServ from "../service/rateService";


// import loginUser from "./loginUser"
// import useri_loginUser from "./useri_loginUser"
// import userii_loginUser from "./userii_loginUser"
// import rate from "./rate"
// import userii from "./userii"



// export default new Vuex.Store({
//   modules: {
//     loginUser,
//     useri_loginUser,
//     userii_loginUser,
//     rate,
//     userii
//   }
// })

const store = new Vuex.Store({
  // 仓库配置对象
  state: {
    // 初始默认状态
    data: null,
    isLoading: false,
  },

  // 提前定义好[同步]数据的变化状态方式方法
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    loginOut({ commit }) {
      commit("setData", null);
      // 全部清空，每次同一时间只允许存在一个
      loginServ_admin.loginOut();
      loginServ_userii.loginOut();
    },
  },

  // 定义好[异步]数据的可能发生变化的方法
  actions: {

    // admin
    async login({ commit }, { loginId, loginPwd }) {
      commit("setIsLoading", true);
      const resp = await loginServ_admin.login(loginId, loginPwd);
      commit("setData", resp.data);
      commit("setIsLoading", false);
      return resp.data;
    },
    async whoAmI({ commit }) {
      commit("setIsLoading", true);
      try {
        const resp = await loginServ_admin.whoAmI();
        commit("setData", resp.data);
      } catch {
        commit("setData", null);
      }
      commit("setIsLoading", false);
    },

    // user i

    // user ii
    async login({ commit }, { loginId, loginPwd }) {
      commit("setIsLoading", true);
      const resp = await loginServ_userii.login(loginId, loginPwd);
      commit("setData", resp.data);
      commit("setIsLoading", false);
      return resp.data;
    },
    async whoAmI({ commit }) {
      commit("setIsLoading", true);
      try {
        const resp = await loginServ_userii.whoAmI();
        commit("setData", resp.data);
      } catch {
        commit("setData", null);
      }
      commit("setIsLoading", false);
    },

    //  // 注册前验证帐户是否已存在
    //  async query({ commit }, { account }) {
    //   const resp = await loginServ_userii.query(account);
    //   commit("setData", resp.data);
    //   return resp.data;
    // },
  }
});

// window.store = store;

export default store;
