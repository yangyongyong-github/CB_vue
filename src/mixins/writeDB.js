
/**
 * 将store中数据写入db中
 * apply: 1. deposit take 2.alert user info
 */

export default async function (user) {
    // deposit & take 本质是刷新数据库数据的操做

    // 1. from store get data
    const userObj = {
        loginId: user.loginId,
        deposit: user.deposit,
        interest: user.interest,
        flag: user.flag
    };

    /**
     * 2. 写入db
     */
    try {
        await this.$store.dispatch("updata", userObj);
        this.tip(); // showMesage
    } catch (error) {
        console.log(error);
    }
}