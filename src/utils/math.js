// 生成一个随机str
export function uuid() {
    return Math.random().toString(16).slice(2, 5).toString();
}

/**
 * 保留指定位数的小数
 * @param {*} num 原数
 * @param {*} pos 保留的位数
 * @returns 
 */

export function DecimalPos(num, pos) {
    // .toFixed()   String
    num = Number(num.toFixed(pos))
    return num;
}

/**
 * 利率显示， 转换为 % 格式
 * @param {*} num 
 * @returns 
 */
export function Persent(num) {
    num = num * 100;// 计算机中，这里*100 之后，会出现浮点数 无限小数位
    num = DecimalPos(num, 2);
    return ` ${num} % `
}

/**
 * 验证数值函数
 * @param {*} num 需要验证的数值类型
 * @param {*} current 保留原来的数值，便于验证失败时用，而不是und
 * @returns 
 */

/**
 * 取反函数
 * @param {*} cage 
 * @param {*} current 原来的值
 * @returns 
 */
export function opposite(cage, current) {
    // 传进来的必须是 boolean 值
    if (typeof cage !== "boolean") {
        alert(" cage not's boole, no exectute ");
        return current; // 不执行，返回当前的状态
    }
    cage = !cage;
    return cage;
}


/*
        千分位分隔符： 慎用？
            转换后为 string 改变数字的属性，不便于计算NaN
        num1.toLocaleString()
        // 2.格式化为千分位带$符号输出
        num.toLocaleString("en-US", { style: "currency", currency: "USD" })
        //"$123,456,789.00"

        // 3.格式化为带￥符号输出
        num.toLocaleString("zh-Hans-CN", { style: "currency", currency: "CNY" })
        //"￥123,456,789.00"
*/
/**
 * 
 * @param {*} cate 选择货币的国籍类型
 * @param {*} number 用户输入需要转换的数字
 * @returns 
 */
export function toThousand(cate = "china", number) {
    if (number < 1000) {
        // 不够格
        return number;
    }

    else if (cate === "china") {
        // "￥123,456,789.00"
        return number.toLocaleString("zh-Hans-CN", { style: "currency", currency: "CNY" })

    } else if (cate === "us") {
        // "$123,456,789.00"
        number.toLocaleString("en-US", { style: "currency", currency: "USD" })
    } else {
        return;
    }
}