import { getRate } from '@/service/rateService'

// temp test
import { getRateData } from '../../service/userService';

export default {
    async getRate({ commit }, { id }) {
        console.log('>>>', id);
        const resp = await getRateData(id);
        console.log('从后端拿取的rate数据:', resp);
        // commit("setRateData", resp.data);
        return resp.data;
    }
} 