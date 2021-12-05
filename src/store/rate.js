import * as rateServ from "../service/rateService";

export default {
    namespaced: true,
    state: {
        data: null,
        // isLoading: false,
    },
    mutations: {
        setData(state, payload) {
            state.data = payload;
        },
        // setIsLoading(state, payload) {
        //     state.isLoading = payload;
        // },
    },
    actions: {
        async getRate({ commit }, { id }) {
            // commit("setIsLoading", true);
            const resp = await rateServ.getRate(id);
            commit("setData", resp.data);
            // commit("setIsLoading", false);
            return resp.data;
        },
        async updataRate({ commit }, { id, rateObj }) {
            // commit("setIsLoading", true);
            const resp = await rateServ.getRate(id, rateObj);
            commit("setData", resp.data);
            // commit("setIsLoading", false);
            return resp.data;
        }
    }
}