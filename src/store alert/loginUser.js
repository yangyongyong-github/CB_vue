import * as loginServ from "../service/loginService";
import * as rateServ from "../service/rateService";

export default {
  namespaced: true,
  state: {
    data: null,
    isLoading: false,
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    async login({ commit }, { loginId, loginPwd }) {
      commit("setIsLoading", true);
      const resp = await loginServ.login(loginId, loginPwd);
      commit("setData", resp.data);
      commit("setIsLoading", false);
      return resp.data;
    },
    loginOut({ commit }) {
      commit("setData", null);
      loginServ.loginOut();
    },
    async whoAmI({ commit }) {
      commit("setIsLoading", true);
      try {
        const resp = await loginServ.whoAmI();
        commit("setData", resp.data);
      } catch {
        commit("setData", null);
      }
      commit("setIsLoading", false);
    },
    // async getRate({ commit }, {id}) {
    //   commit("setIsLoading", true);
    //   const resp = await rateServ.getRate(id);
    //   commit("setData", resp.data);
    //   commit("setIsLoading", false);
    //   return resp.data;
    // },
    // async updataRate({ commit }, { id, rateObj }) {
    //   commit("setIsLoading", true);
    //   const resp = await rateServ.getRate(id, rateObj);
    //   commit("setData", resp.data);
    //   commit("setIsLoading", false);
    //   return resp.data;
    // }
  },
};
