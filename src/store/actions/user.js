import * as userServ from '@/service/userService';

export default {
    async login({ commit }, { loginId, loginPwd, flag }) {
        commit("setIsLoading", true);
        const resp = await userServ.login(loginId, loginPwd, flag);
        commit("setUserData", resp.data);
        commit("setIsLoading", false);
        return resp.data;
    },

    loginOut({ commit }) {
        commit("setUserData", null);
        userServ.loginOut();
    },

    async whoAmI({ commit }) {
        commit("setIsLoading", true);
        try {
            const resp = await userServ.whoAmI();
            commit("setUserData", resp.data);
        } catch {
            commit("setUserData", null);
        }
        commit("setIsLoading", false);
    },

    // 注册前验证帐户是否已存在
    async query({ account, flag }) {
        const resp = await userServ.query(account, flag);
        return resp.data;
    },

    // adduser
    async adduser({ commit }, userObj) {
        commit("setIsLoading", true);
        const resp = await userServ.adduser(userObj);
        commit("setUserData", resp.data);
        commit("setIsLoading", false);
        return resp.data;
    },

    // deposit & take
    // 无论是deposit 还是take 无非是对这两个数的操做，而且只是写回db这两个数
    async updata({ commit }, userObj) {
        commit("setIsLoading", true);
        const resp = await userServ.updata(userObj);
        commit("setIsLoading", false);
        return resp.data;
        /**
         *  resp.data 仅仅用来反馈消息，而非 userObj
         * 错误：commit("setUserData", resp.data);
         * 没必要，应为已经在store中修改了
         */
    },

    /**
     * 得到所有的用户信息
     * @param {*} param0 
     * @returns 
     */
    async getAllUser({ commit }) {
        const resp = await userServ.getAllUsersData();
        console.log('getAllUser resp :',resp.data)
        commit("setUsersData", resp.data)
        return resp.data
    }
}