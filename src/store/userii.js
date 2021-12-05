import * as userServ from "../service/userii_Service";

/**
 * userii
 * - adduser
 */

export default {
    namespaced: true,
    state: {
        data: null,
        isLoading: false,
    },
    mutations: {
        setData(state, payload) { // 设置的是状态信息，用户登录的状态信息
            state.data = payload;
        },
        setIsLoading(state, payload) {
            state.isLoading = payload;
        },
    },
    actions: {
        // adduser
        async adduser({ commit }, userObj) {
            commit("setIsLoading", true);
            const resp = await userServ.adduser(userObj);
            commit("setData", resp.data);
            commit("setIsLoading", false);
            return resp.data;
        },
        // deposit & take
        // 无论是deposit 还是take 无非是对这两个数的操做，而且只是写回db这两个数
        async updata({ commit }, userObj) {
            commit("setIsLoading", true);
            const resp = await userServ.updata(userObj);
            commit("setData", resp.data);
            commit("setIsLoading", false);
            return resp.data;
        }
    },
};
