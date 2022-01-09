import * as Serv from '@/service/otherService'

export default {

    /**
     * get rate
     */
    async getRate({ commit }, { id }) {
        const resp = await Serv.getRateData(id);
        // console.log('resp of commit : ',resp.data);
        commit("setRateData", resp.data);
        return resp.data;
    },

    /**
     * get bank
     */
    async getBank({ commit }, { id }) {
        const resp = await Serv.getBankData(id);
        commit("setBankData", resp.data);
        return resp.data;
    },

    /**
    * get users
    */
    async getUsers({ commit }) {
        const resp = await Serv.getUsersData();
        commit("setUsersData", resp.data);
        return resp.data;
    },

    // update bank
    async updateBank({ commit }, obj) { // {id, obj} -> obj 这里直接是一整个，不再区分
        commit("setIsLoading", true);
        const resp = await Serv.updateBank(obj);
        commit("setIsLoading", false);
        return resp.data;
    },

   // update rate
    async updateRate({ commit }, obj) {
        commit("setIsLoading", true);
        const resp = await Serv.updateRate(obj);
        commit("setIsLoading", false);
        return resp.data;
        
    },

}




