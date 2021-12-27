export default {
    // userData
    setUserData(state, payload) {
        state.userData = payload;
    },
    // interest
    setUserInterest(state, payload) {
        state.userData.interest = payload;
    },
    // loan
    setUserILoan(state, payload) {
        state.userData.loan = payload;
    },
    // deposit
    setUserIIDeposit(state, payload) {
        state.userData.deposit = payload;
    },
    // usersData
    setUsersData(state, payload) {
        state.usersData = payload;
    },
    setIsLoading(state, payload) {
        state.isLoading = payload;
    },
}