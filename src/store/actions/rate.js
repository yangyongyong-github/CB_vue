import * as rateServ from '@/service/rateService'

export default {
    async getRate({ commit }, { id }) {
        console.log('>>>', id); // ??
        const resp = await rateServ.query(id);
        commit("setRateData", resp.data);
        return resp.data;
    }
} 