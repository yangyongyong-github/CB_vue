export default {
    // userData
    setUserData(state, payload) {
        state.userData = payload;
    },
    // interest (useri userii)
    setUserInterest(state, payload) {
        state.userData.interest = payload;
    },
    // admin query user by account
    setUserQueryData(state, payload) {
        state.userQueryData = payload;
    },
    /**
     * I
     */
    setUserILoan(state, payload) { // loan
        state.userData.loan = payload;
    },
    // setUserInterest(state, payload) { // interest
    //     state.userData.interest = payload;
    // },
    setUserIIdent(state, payload) {
        state.userData.ident = payload;
    },
    setUserICause(state, payload) {
        state.userData.cause = payload;
    },
    setUserICompany(state, payload) {
        state.userData.company = payload;
    },

    /**
     * II
     */
    setUserIIDeposit(state, payload) {
        state.userData.deposit = payload;
    },
    // setUserIInterest(state, payload) { // interest
    //     state.userData.interest = payload;
    // },


    /**
     * other
     */
    // usersData
    setUsersData(state, payload) {
        state.usersData = payload;
    },

}