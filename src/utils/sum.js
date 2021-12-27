const { DecimalPos } = require("./math")

/**
 * 累计求和
 * @param {*} arrs 传入一个数组 [{,deposit,},{,deposit,},{,deposit,}]
 * @param {*} attr : 'deposit' / 'interest' / 'loan' 
 *      【注意：一定传入是字符串，而不是变量！】
 * @returns 
 */

exports.sum = function (arrs, attr) {
    if (arrs.length === 0) return;
    
    var num = 0;
    // result.datas.map((item) => {
    arrs.map((item) => {
        // console.log(typeof +item.deposit, +item.deposit)
        num += +item[attr]; // 【注意： 这里一定使用[]，打点调用是拿不到参数的(参数未使用)】
        // console.log("temp : ", depositAll);
        return num;
    })
    return DecimalPos(num, 2);
}