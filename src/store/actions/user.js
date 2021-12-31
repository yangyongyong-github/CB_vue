import * as userServ from '@/service/userService';
import * as adminServ from '@/service/adminService'

export default {
    /**
     * login 
     *  - admin useri userii
     */
    async login({ commit }, { loginId, loginPwd, flag }) {
        commit("setIsLoading", true);
        const resp = await userServ.login(loginId, loginPwd, flag);
        commit("setUserData", resp.data);
        commit("setIsLoading", false);
        return resp.data;
    },

    loginOut({ commit }) {
        commit("setUserData", null);
        commit('setUserQueryData', '');// 如果管理员曾经查询过用户，则清空
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

    /**
     * 查询用户
     * useri userii
     * 场景: 
     *   -  注册前验证帐户是否已存在
     */
    async queryUser({ commit }, { account, flag }) { // 参数1 即使不用也要写上去，因为是源码中的参数
        // console.log('scan ', { account, flag });
        const resp = await userServ.query(account, flag);
        return resp.data;
    },
    async deleteUser({ commit }, { account, flag }) { // 参数1 即使不用也要写上去，因为是源码中的参数
        // console.log('scan ', { account, flag });
        const resp = await userServ.deleteUserData(account, flag);
        commit('setUserQueryData', '');
        return resp.data;
    },
    /**
     * 查询用户
     * admin
     * 场景: 
     *   -  管理员查询用户(存储查询结果)
     */
    async QueryUser({ commit }, { account, flag }) {
        // console.log('admin query result :  ', { account, flag });
        commit("setIsLoading", true);
        const resp = await userServ.query(account, flag);
        commit("setUserQueryData", resp.data);
        commit("setIsLoading", false);
        return resp.data;
    },

    /**
     *  adduser(register user)
     * useri userii 
     */
    async adduser({ commit }, userObj) {
        commit("setIsLoading", true);
        const resp = await userServ.adduser(userObj);
        commit("setUserData", resp.data);
        commit("setIsLoading", false);
        return resp.data;
    },

    // deposit & take
    // 无论是deposit 还是take 无非是对这两个数的操做，而且只是写回db这两个数
    async update({ commit }, userObj) {
        commit("setIsLoading", true);
        const resp = await userServ.updata(userObj);
        // commit("setUserData", resp.data); // 这里不必了，因为先写入store中再发送给db的
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
     */
    async getAllUser({ commit }) {
        const resp = await userServ.getAllUsersData();
        // console.log('getAllUser resp :', resp.data)
        commit("setusersData", resp.data);
        return resp.data;
    },

    // /**
    //  * admin alter user info
    //  */
    // async alterUserInfo({ commit }, userObj) {
    //     const resp = await userServ.update(userObj);
    //     commit('setAlter_UserData', resp.data);
    //     return resp.data;
    // }
}