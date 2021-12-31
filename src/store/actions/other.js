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

    /**
     * set bank corpus
     */
    async setBankCorpus({ commit }, { id = "CBNo1", newCorpus }) {
        commit("setCorpusData", resp.data);
        const resp = await Serv.updateBankCorpus(id, newCorpus);
        
        return resp.data;
    }

}




