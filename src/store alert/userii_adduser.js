import * as userServ from "../service/userii_Service";

// userii

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
    // adduser
    async adduser({ commit }, { loginId, loginPwd }) {
      commit("setIsLoading", true);
      const resp = await userServ.login(loginId, loginPwd);
      commit("setData", resp.data);
      commit("setIsLoading", false);
      return resp.data;
    },

  },
};
